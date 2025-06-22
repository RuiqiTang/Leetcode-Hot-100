# 141. 环形链表

给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <title>环形链表示意图</title>
</head>

<body>
  <svg width="800" height="250" xmlns="http://www.w3.org/2000/svg">
    <!-- 绘制节点 -->
    <!-- 节点 3 -->
    <circle cx="50" cy="100" r="30" stroke="black" stroke-width="2" fill="white" />
    <text x="45" y="105" font-family="Arial" font-size="20">3</text>
    <!-- 节点 2 -->
    <circle cx="200" cy="100" r="30" stroke="black" stroke-width="2" fill="white" />
    <text x="195" y="105" font-family="Arial" font-size="20">2</text>
    <!-- 节点 0 -->
    <circle cx="350" cy="100" r="30" stroke="black" stroke-width="2" fill="white" />
    <text x="345" y="105" font-family="Arial" font-size="20">0</text>
    <!-- 节点 -4 -->
    <circle cx="500" cy="100" r="30" stroke="black" stroke-width="2" fill="white" />
    <text x="492" y="105" font-family="Arial" font-size="20">-4</text>
    <!-- 绘制普通箭头（直线连接） -->
    <line x1="80" y1="100" x2="170" y2="100" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
    <line x1="230" y1="100" x2="320" y2="100" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
    <line x1="380" y1="100" x2="470" y2="100" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
    <!-- 绘制从 -4 指向 2 的环形箭头，调整路径使其指向节点 2 -->
    <path d="M 530 100 Q 350 30 230 100" stroke="black" stroke-width="2" fill="none" marker-end="url(#arrow)" />
    <!-- 定义箭头标记 -->
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="black" />
      </marker>
    </defs>
  </svg>
</body>

</html>

```python
# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        slow=fast=head 
        while fast and fast.next:
            slow=slow.next 
            fast=fast.next.next 

            if slow is fast:
                return True
        return False

```