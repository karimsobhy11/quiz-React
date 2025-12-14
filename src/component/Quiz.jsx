import { useState, useEffect } from "react";


const questions = [
  {
    question: "ما هو ناتج 2 + '2' في JavaScript؟",
    options: ["4", "22", "NaN", "Error"],
    correct: 1,
  },
  {
    question: "أي من هذه الكلمات تُستخدم لتعريف متغير؟",
    options: ["var", "let", "const", "جميع ما سبق"],
    correct: 3,
  },
  {
    question: "ما نوع القيمة التي تُرجعها الدالة التي لا تُرجع شيئًا؟",
    options: ["null", "undefined", "false", "0"],
    correct: 1,
  },
  {
    question: "ما هو النوع الأساسي للمصفوفات في JavaScript؟",
    options: ["Object", "Array", "Function", "String"],
    correct: 0,
  },
  {
    question: "ما هو ناتج typeof null؟",
    options: ["null", "object", "undefined", "string"],
    correct: 1,
  },
  {
    question: "أي من هذه تستخدم للمقارنة بين القيم والأنواع؟",
    options: ["==", "!=", "===", "="],
    correct: 2,
  },
  {
    question: "ما هي الطريقة الصحيحة لتعريف دالة؟",
    options: ["function = myFunc()", "function myFunc()", "let myFunc = function()", "function:myFunc()"],
    correct: 1,
  },
  {
    question: "ما هو ناتج 0 == '0'؟",
    options: ["true", "false", "NaN", "undefined"],
    correct: 0,
  },
  {
    question: "أي من هذه الحلقات تتوقف بشرط false؟",
    options: ["for", "while", "do...while", "جميع ما سبق"],
    correct: 3,
  },
  {
    question: "أي من التالي ليس حدثًا في JavaScript؟",
    options: ["onclick", "onhover", "onload", "onchange"],
    correct: 1,
  },
  {
    question: "ما هو الاستخدام الرئيسي للدالة parseInt؟",
    options: ["تحويل نص إلى رقم صحيح", "دمج نصوص", "إرجاع نص", "مقارنة قيم"],
    correct: 0,
  },
  {
    question: "كيف تكتب تعليق في سطر واحد في JavaScript؟",
    options: ["<!-- comment -->", "// comment", "/* comment */", "** comment"],
    correct: 1,
  },
  {
    question: "ما هو الفرق بين let و var؟",
    options: [
      "let لها نطاق كتلة (block) و var لها نطاق دالة (function)",
      "لا يوجد فرق",
      "var أسرع من let",
      "let تُستخدم فقط داخل دوال"
    ],
    correct: 0,
  },
  {
    question: "أي من هذه تُستخدم لتعريف كائن (Object)؟",
    options: ["[]", "()", "{}", "<>"],
    correct: 2,
  },
{
  question: "ما هوا ناتج typeof NaN؟",
  options: ["Number" , "NaN" , "Undefined" , "object"],
  correct: 0,
}
];

function Quiz() {
  const [current , setCurrent] = useState(0);  //مخصصه ل رقم السوال الحالي اللي المستخدم واقف عليه
  const [selected , setSelected] = useState(null); // مخصصه ل الاجابه اللي المستخدم اختارها ف السوال الحالي
  const [score , setScore] = useState(0); // عدد الاجابات الصح اللي المستخدم جاوبها
  const [time , setTime] = useState(120);  // الوقت
  const [finished , setFinished] = useState(false); // مخصصه هل الاختبار انتهي ولا لا

  //المؤقت
 
useEffect (() => {

  if (finished) return;

if (time === 0) {
  handleNext();
  return;
}

const timer = setInterval(() => setTime((prev) => prev - 1), 1000);

return () => clearInterval(timer);

}, [time, finished]);
 
//تغيير الاجابه
const handleSelect = (index) => {

  setSelected(index);
}

//الانتقال للسوال التاني

const handleNext = () => {
 if (selected === questions[current].correct) {
 setScore((prev) => prev + 1);
 }

 if (current < questions.length -1) {
  setCurrent((prev)=> prev + 1);
  setSelected(null);
  setTime(120);
 } else {
  setFinished(true);
 }

};

const formatTime = (seconds) => {
const m = Math.floor(seconds / 60);
const s = seconds % 60;
return `${s < 10 ? "0" + s : s} : ${m}`;
}
  
if (finished) {
  const percent = Math.round((score / questions.length) *100);
  const message = percent >= 80 ? "ممتاز! 💯" : percent >= 60 ? "جيد جدا 👍" : "ضعيف😒";


return(
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300 text-center">
    <h1 className="text-4xl font-bold text-green-800 mb-4">النتيجة</h1>
    <p className="text-2xl text-gray-700 mb-2">
     عدد الاجابات الصحيحة: {score} من {questions.length}
    </p>
    <p className="text-xl text-gray-600 mb-6">نسبة النجاح: {percent} %</p>
    <p className="text-xl font-semibold text-green-700">{message}</p>
  </div>
);}


return (
<div className="content max-w-xl mx-auto mt-20 p-6 bg-indigo-200 shadow-lg rounded-xl text-center">
<h2 className="text1 text-xl font-semibold mb-4">السؤال {current + 1} من {questions.length}</h2>

<p className="text2 text-lg mb-6">{questions[current].question}</p>

<div className="grid gap-3 mb-6">
{questions[current].options.map((opt , index)=> (
<button key={index} onClick={() => handleSelect(index)} className={`px-4 py-2 rounded border ${
  selected === index 
  ? "bg-blue-600 text-white"
  : "bg-gray-100 hover:bg-gray-200"
}`}>
{opt}
</button>
))}
</div>

<div className="text3 text-gray-700 font-medium text-lg mb-4">
⏱ الوقت المتبقي: <span className="text-red-600">{formatTime(time)}</span>
</div>

<button onClick={handleNext} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
{current < questions.length -1 ? "التالي" : "عرض النتيجة"}
</button>

</div>
)

}; 



export default Quiz;



