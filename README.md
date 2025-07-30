# find-path-in-tree

在树形结构中查找符合条件的节点路径和目标节点的 TypeScript 工具函数。

## 安装

```bash
npm install find-path-in-tree
# 或
pnpm add find-path-in-tree
# 或
yarn add find-path-in-tree
```

## 使用方法

### 基本用法

```typescript
import { findPathInTree } from 'find-path-in-tree'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

const tree: TreeNode[] = [
  {
    id: 1,
    name: 'root',
    children: [
      {
        id: 2,
        name: 'child1',
        children: [
          { id: 3, name: 'grandchild1' },
          { id: 4, name: 'grandchild2' }
        ]
      },
      { id: 5, name: 'child2' }
    ]
  }
]

// 查找 id 为 4 的节点
const result = findPathInTree(tree, node => node.id === 4)

console.log(result.target) // { id: 4, name: 'grandchild2' }
console.log(result.path)   // [root, child1, grandchild2] 完整路径
```

### 自定义子节点字段名

```typescript
interface CustomNode {
  id: number
  name: string
  items?: CustomNode[] // 使用 'items' 而不是 'children'
}

const customTree: CustomNode[] = [
  {
    id: 1,
    name: 'root',
    items: [
      { id: 2, name: 'child' }
    ]
  }
]

// 指定子节点字段名为 'items'
const result = findPathInTree(customTree, node => node.id === 2, 'items')
```

### 复杂查找条件

```typescript
// 使用复杂的查找条件
const result = findPathInTree(
  tree,
  node => node.name.includes('child') && node.id > 3
)
```

## API

### `findPathInTree<T>(tree, predicate, childrenKey?)`

#### 参数

- `tree: T[]` - 树形结构数组
- `predicate: (node: T) => boolean` - 判断节点是否符合条件的函数
- `childrenKey?: string` - 子节点字段名，默认为 `'children'`

#### 返回值

```typescript
{
  path: T[]     // 从根节点到目标节点的完整路径数组
  target?: T    // 找到的目标节点，如果未找到则为 undefined
}
```

#### 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 支持自定义子节点字段名
- ✅ 返回完整的节点路径
- ✅ 深度优先搜索算法
- ✅ 零依赖
- ✅ 支持 ESM 和 CommonJS

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建
pnpm run build

# 测试
pnpm run test

# 代码检查
pnpm run lint

# 代码格式化
pnpm run format
```

## 许可证

MIT