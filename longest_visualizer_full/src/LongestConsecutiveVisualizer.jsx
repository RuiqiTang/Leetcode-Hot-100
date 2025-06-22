import React, { useState } from "react";
import { motion } from "framer-motion";

const initialNums = [100, 4, 200, 1, 3, 2];
const numsSet = new Set(initialNums);
const numsArray = Array.from(numsSet);

const pythonCode = [
  "class Solution(object):",
  "    def longestConsecutive(self, nums):",
  "        longest_streak=0",
  "        nums_set=set(nums)",
  "        for num in nums_set:",
  "            if num-1 not in nums_set:",
  "                current_num=num",
  "                current_steak=1",
  "                while current_num+1 in nums_set:",
  "                    current_steak+=1",
  "                    current_num+=1",
  "                longest_streak=max([longest_streak,current_steak])",
  "        return longest_streak",
];

// 精细同步的步骤数组构造，每步带对应高亮代码行（0基）
// 代码行号对应 pythonCode 数组索引
function getSteps(nums) {
  const steps = [];
  const seen = new Set();
  let longest_streak = 0;

  for (let num of nums) {
    if (!seen.has(num - 1)) {
      // 判断是否为起点 - 高亮 line 5
      steps.push({
        base: num,
        streakSequence: [],
        current_streak: 0,
        longest_streak,
        highlightedLine: 5,
      });

      let current_num = num;
      let current_streak = 1;
      const streakSequence = [num];

      // 初始化 current_num 和 current_steak - line 6,7
      steps.push({
        base: num,
        streakSequence: [...streakSequence],
        current_streak,
        longest_streak,
        highlightedLine: 6,
      });
      steps.push({
        base: num,
        streakSequence: [...streakSequence],
        current_streak,
        longest_streak,
        highlightedLine: 7,
      });

      while (numsSet.has(current_num + 1)) {
        // while 条件检查 - line 8
        steps.push({
          base: num,
          streakSequence: [...streakSequence],
          current_streak,
          longest_streak,
          highlightedLine: 8,
        });

        current_num++;
        current_streak++;
        streakSequence.push(current_num);

        // while 循环体 - line 9 & 10 (合并为一行高亮9)
        steps.push({
          base: num,
          streakSequence: [...streakSequence],
          current_streak,
          longest_streak,
          highlightedLine: 9,
        });
      }

      // 更新最长长度 - line 11
      longest_streak = Math.max(longest_streak, current_streak);
      steps.push({
        base: num,
        streakSequence: [...streakSequence],
        current_streak,
        longest_streak,
        highlightedLine: 11,
      });
    }
    seen.add(num);
  }

  // 返回结果 - line 12（可选）
  steps.push({
    base: null,
    streakSequence: [],
    current_streak: 0,
    longest_streak,
    highlightedLine: 12,
  });

  return steps;
}

export default function LongestConsecutiveVisualizer() {
  const steps = getSteps(numsArray);
  const [stepIndex, setStepIndex] = useState(0);

  const current = steps[stepIndex];
  const highlightedLine = current?.highlightedLine ?? -1;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Longest Consecutive Sequence Visualizer
      </h1>

      {/* 输入数组展示 */}
      <section className="mb-6">
        <p className="mb-2 text-lg font-semibold">Input array:</p>
        <div className="flex flex-wrap gap-3">
          {initialNums.map((num, i) => (
            <motion.div
              key={i}
              layout
              className={
                "px-4 py-2 rounded-full text-white text-lg font-medium " +
                (current?.streakSequence.includes(num)
                  ? "bg-blue-600"
                  : "bg-gray-500")
              }
              aria-label={
                current?.streakSequence.includes(num)
                  ? "In current streak"
                  : "Not in current streak"
              }
            >
              {num}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 当前步骤信息 */}
      {current && (
        <section className="mb-6 bg-white rounded-lg p-4 shadow">
          <p className="mb-1">
            <strong>Step {stepIndex + 1}:</strong>{" "}
            {current.base !== null
              ? `Starting at ${current.base}`
              : "Finished calculation"}
          </p>
          <p className="mb-1">
            Current Streak Length: <code>{current.current_streak}</code>
          </p>
          <p className="mb-1">
            Longest Streak So Far: <code>{current.longest_streak}</code>
          </p>
          {current.streakSequence.length > 0 && (
            <p className="mb-0">
              Sequence:{" "}
              <code className="text-blue-700 font-semibold">
                {current.streakSequence.join(" → ")}
              </code>
            </p>
          )}
        </section>
      )}

      {/* Python代码展示 */}
      <section className="mb-6 bg-gray-100 p-4 rounded font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-96">
        {pythonCode.map((line, idx) => (
          <div
            key={idx}
            className={idx === highlightedLine ? "bg-yellow-300" : ""}
            style={{ whiteSpace: "pre" }}
          >
            {line}
          </div>
        ))}
      </section>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          disabled={stepIndex === 0}
          className="px-5 py-2 rounded bg-gray-400 disabled:opacity-50 text-white hover:bg-gray-500 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}
          disabled={stepIndex === steps.length - 1}
          className="px-5 py-2 rounded bg-blue-600 disabled:opacity-50 text-white hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
