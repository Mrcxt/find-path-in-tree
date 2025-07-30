/**
 * 在树形结构中查找符合条件的节点路径和目标节点
 *
 * @param tree - 树形结构数组
 * @param predicate - 判断节点是否符合条件的函数
 * @param childrenKey - 子节点字段名，默认为 'children'
 * @returns 包含路径（从根到目标）和目标节点的对象，如果未找到则返回空路径和 undefined
 */
export function findPathInTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  childrenKey: string = 'children'
): { path: T[]; target?: T } {
  const path: T[] = []

  function dfs(nodes: T[]): boolean {
    for (const node of nodes) {
      path.push(node)

      if (predicate(node)) {
        return true
      }

      const children = node[childrenKey] as T[] | undefined
      if (Array.isArray(children) && dfs(children)) {
        return true
      }

      path.pop() // 回溯
    }
    return false
  }

  dfs(tree)

  return {
    path,
    target: path?.[path.length - 1],
  }
}

// 默认导出
export default findPathInTree
