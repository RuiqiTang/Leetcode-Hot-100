import React, { useState, useEffect, useRef } from "react";

const pythonCode = `class Solution(object):
    def lengthOfLongestSubstring(self, s):
        occ=set()
        rk,ans=-1,0
        n=len(s)

        for i in range(n):
            if i!=0:
                occ.remove(s[i-1])
            while rk+1<n and s[rk+1] not in occ:
                occ.add(s[rk+1])
                rk+=1
            ans=max([ans,rk-i+1])
        return ans`;

const codeLines = pythonCode.split("\n");

export default function LongestSubstringVisualizer() {
  const [input, setInput] = useState("abcabcbb");
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [windowContent, setWindowContent] = useState("");
  const [occSet, setOccSet] = useState(new Set());
  const [rk, setRk] = useState(-1);
  const [ans, setAns] = useState(0);
  const [i, setI] = useState(0);

  // Store steps info as array of objects with info to render
  const steps = useRef([]);

  // Prepare steps for animation
  const prepareSteps = () => {
    const s = input;
    const n = s.length;
    let occ = new Set();
    let rk = -1;
    let ans = 0;
    let stepsArr = [];

    for (let i = 0; i < n; i++) {
      // Step: if i != 0, remove s[i-1]
      if (i !== 0) {
        occ.delete(s[i - 1]);
        stepsArr.push({
          i,
          rk,
          ans,
          occ: new Set(occ),
          highlightLine: 9, // "if i!=0:"
          action: `Remove '${s[i - 1]}' from occ`,
        });
      }
      // Step: while rk+1<n and s[rk+1] not in occ:
      while (rk + 1 < n && !occ.has(s[rk + 1])) {
        rk++;
        occ.add(s[rk]);
        ans = Math.max(ans, rk - i + 1);
        stepsArr.push({
          i,
          rk,
          ans,
          occ: new Set(occ),
          highlightLine: 12, // while loop line
          action: `Add '${s[rk]}' to occ, update rk to ${rk}`,
        });
      }
      // After while loop, update ans max
      stepsArr.push({
        i,
        rk,
        ans,
        occ: new Set(occ),
        highlightLine: 14, // ans = max([...])
        action: `Update ans to ${ans}`,
      });
    }

    steps.current = stepsArr;
    setMaxStep(stepsArr.length);
  };

  useEffect(() => {
    prepareSteps();
    setStep(0);
    setWindowContent("");
    setOccSet(new Set());
    setRk(-1);
    setAns(0);
    setI(0);
  }, [input]);

  // Play animation: move step by step
  useEffect(() => {
    if (step >= maxStep || step < 0) return;

    const currentStep = steps.current[step];
    if (!currentStep) return;

    setWindowContent(
      input.slice(currentStep.i, currentStep.rk + 1 + 1)
    );
    setOccSet(currentStep.occ);
    setRk(currentStep.rk);
    setAns(currentStep.ans);
    setI(currentStep.i);
  }, [step]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 font-semibold">Input string:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded w-full max-w-xs"
        />
      </div>

      <div className="flex space-x-4 items-center">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={() => setStep((s) => Math.min(maxStep - 1, s + 1))}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Next
        </button>
        <div>
          Step: {step + 1} / {maxStep}
        </div>
      </div>

      <div className="flex space-x-10">
        <div className="w-1/2">
          <h2 className="font-semibold mb-2">Python Code</h2>
          <pre className="bg-gray-100 p-4 rounded max-h-[320px] overflow-auto text-sm font-mono">
            {codeLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  idx === (steps.current[step]?.highlightLine || -1)
                    ? "bg-yellow-300"
                    : ""
                }
              >
                {line}
              </div>
            ))}
          </pre>
        </div>
        <div className="w-1/2">
          <h2 className="font-semibold mb-2">Visualization</h2>
          <div className="border rounded p-4 bg-white min-h-[150px]">
            <div>
              <span className="font-semibold">Current i:</span> {i}
            </div>
            <div>
              <span className="font-semibold">Current rk:</span> {rk}
            </div>
            <div>
              <span className="font-semibold">Current window substring:</span>{" "}
              <span className="text-blue-600 font-mono">{windowContent}</span>
            </div>
            <div>
              <span className="font-semibold">Current occ Set:</span>{" "}
              {[...occSet].map((c) => (
                <span
                  key={c}
                  className="inline-block bg-indigo-200 text-indigo-800 px-2 py-0.5 mr-1 rounded text-xs font-mono"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-2 italic text-gray-600">
              {steps.current[step]?.action}
            </div>
            <div className="mt-4 font-bold">Max length so far: {ans}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
