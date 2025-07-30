import { describe, it, expect } from 'vitest'
import { findPathInTree } from './index'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

interface CustomTreeNode {
  id: number
  name: string
  items?: CustomTreeNode[]
}

describe('findPathInTree', () => {
  const tree: TreeNode[] = [
    {
      id: 1,
      name: 'root1',
      children: [
        {
          id: 2,
          name: 'child1',
          children: [
            { id: 3, name: 'grandchild1' },
            { id: 4, name: 'grandchild2' },
          ],
        },
        { id: 5, name: 'child2' },
      ],
    },
    {
      id: 6,
      name: 'root2',
      children: [{ id: 7, name: 'child3' }],
    },
  ]

  it('should find the correct path and target for existing node', () => {
    const result = findPathInTree(tree, node => node.id === 4)

    expect(result.target).toEqual({ id: 4, name: 'grandchild2' })
    expect(result.path).toHaveLength(3)
    expect(result.path[0]).toEqual(tree[0])
    expect(result.path[1]).toEqual(tree[0].children![0])
    expect(result.path[2]).toEqual({ id: 4, name: 'grandchild2' })
  })

  it('should find root node', () => {
    const result = findPathInTree(tree, node => node.id === 1)

    expect(result.target).toEqual(tree[0])
    expect(result.path).toHaveLength(1)
    expect(result.path[0]).toEqual(tree[0])
  })

  it('should return empty path and undefined target for non-existing node', () => {
    const result = findPathInTree(tree, node => node.id === 999)

    expect(result.target).toBeUndefined()
    expect(result.path).toHaveLength(0)
  })

  it('should work with custom children key', () => {
    const customTree: CustomTreeNode[] = [
      {
        id: 1,
        name: 'root',
        items: [
          {
            id: 2,
            name: 'child',
            items: [{ id: 3, name: 'grandchild' }],
          },
        ],
      },
    ]

    const result = findPathInTree(customTree, node => node.id === 3, 'items')

    expect(result.target).toEqual({ id: 3, name: 'grandchild' })
    expect(result.path).toHaveLength(3)
  })

  it('should work with empty tree', () => {
    const result = findPathInTree([] as TreeNode[], node => node.id === 1)

    expect(result.target).toBeUndefined()
    expect(result.path).toHaveLength(0)
  })

  it('should work with tree without children', () => {
    const flatTree: TreeNode[] = [
      { id: 1, name: 'node1' },
      { id: 2, name: 'node2' },
    ]

    const result = findPathInTree(flatTree, node => node.id === 2)

    expect(result.target).toEqual({ id: 2, name: 'node2' })
    expect(result.path).toHaveLength(1)
    expect(result.path[0]).toEqual({ id: 2, name: 'node2' })
  })

  it('should find first matching node', () => {
    const treeWithDuplicates: TreeNode[] = [
      {
        id: 1,
        name: 'duplicate',
        children: [{ id: 2, name: 'duplicate' }],
      },
      { id: 3, name: 'duplicate' },
    ]

    const result = findPathInTree(
      treeWithDuplicates,
      node => node.name === 'duplicate'
    )

    expect(result.target).toEqual(treeWithDuplicates[0])
    expect(result.path).toHaveLength(1)
  })

  it('should work with complex predicate', () => {
    const result = findPathInTree(
      tree,
      node => node.name.includes('child') && node.id > 5
    )

    expect(result.target).toEqual({ id: 7, name: 'child3' })
    expect(result.path).toHaveLength(2)
  })
})
