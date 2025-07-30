/**
 * 在树形结构中查找符合条件的节点路径和目标节点
 *
 * @param tree - 树形结构数组
 * @param predicate - 判断节点是否符合条件的函数
 * @param childrenKey - 子节点字段名，默认为 'children'
 * @returns 包含路径（从根到目标）和目标节点的对象，如果未找到则返回空路径和 undefined
 */
export function findPathInTree<T>(
  tree: T[],
  predicate: (node: T) => boolean,
  childrenKey: keyof T = 'children' as keyof T
): { path: T[]; target?: T } {
  const path: T[] = []

  function dfs(nodes: T[]): boolean {
    if (!Array.isArray(nodes)) {
      return false
    }

    for (const node of nodes) {
      // 跳过 null 或 undefined 节点
      if (node == null) {
        continue
      }

      path.push(node)

      if (predicate(node)) {
        return true
      }

      // 安全地获取子节点，支持各种数据类型
      const children = (node as any)?.[childrenKey]
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
    target: path.length > 0 ? path[path.length - 1] : undefined,
  }
}

// 默认导出
export default findPathInTree
