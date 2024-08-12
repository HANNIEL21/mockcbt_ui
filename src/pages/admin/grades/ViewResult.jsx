import React, {forwardRef, useRef, useEffect} from "react";
import logo from "../../../assets/rsu-logo.png";

import {useReactToPrint} from "react-to-print";

const ViewResult = ({data, closeViewResultModal}) => {

    console.log(data);
    


    return (
        <div>
            <div className="bg-white flex flex-col items-center relative p-5">
                <div className="flex justify-between w-full">
                    <button
                        className=" bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none noprint"
                        onClick={closeViewResultModal}
                    >
                        Close
                    </button>
                    <PrintButton result={data}/>
                </div>
                <Result result={data}/>
            </div>
        </div>
    );
};

export default ViewResult;


const  Result = forwardRef((props , ref)=> {
    const {result} = props
    return <div ref={ref}>
        <div className="bg-white flex flex-col items-center relative">
            <header className="w-full flex justify-center items-center">
                <div className="w-2/12">
                    <img src={logo} alt="" className="h-full object-cover object-center" />
                </div>
                <div className="w-9/12 text-center">
                    <h1 className="text-2xl font-bold capitalize text-center text-blue-900">
                        rivers state university of science and technology
                    </h1>
                    <p className="text-xl font-bold capitalize italic mt-2 text-gray-600">
                        {result.exam}
                    </p>
                </div>
            </header>
            <main className="w-full text-center space-y-5">
                <div className="my-4">
                    <p className="font-semibold text-blue-900">Candidate Result</p>
                </div>
                <div className="h-full capitalize flex flex-col justify-evenly items-start mb-10">
                    <p className="text-gray-700 font-semibold">
                        candidate name:&nbsp;
                        <span className=" text-lg font-bold text-blue-900">
                      {result.firstname} {result.lastname}
                    </span>
                    </p>
                    <p className="text-gray-700  font-semibold">
                        candidate number:&nbsp;
                        <span className="text-lg font-bold text-blue-900">
                      {result.examno}
                    </span>
                    </p>
                    <div className="w-full border border-black rounded-sm mt-10">
                        <table className="border-collapse table-fixed w-full text-sm">
                            <thead className="font-bold text-black">
                            <tr>
                                <td className="border-b border-black p-4 pl-8 ">SUBJECT</td>
                                <td className="border-b border-black p-4 pl-8 ">Score</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">SUBJECT</td>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">{result.s1}</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">SUBJECT</td>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">{result.s2}</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">SUBJECT</td>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">{result.s3}</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">SUBJECT</td>
                                <td className="border-b border-slate-200 p-4 pl-8 text-slate-500">{result.s4}</td>
                            </tr>
                            <tr>
                                <td className="border-t border-black p-4 pl-8 text-slate-700 font-bold">Total</td>
                                <td className="border-t border-black p-4 pl-8 text-slate-700 font-bold
                                ">{result.score}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    </div>
})

const PrintButton = ({result}) => {
    const resultRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => resultRef.current,
        pageStyle: `
        @page {
            margin : 1rem
        }
        `
    });

    return (
        <div>
            <div className="hidden"><Result ref={resultRef} result={result}/></div>
            <button
                className=" bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                onClick={handlePrint}>Print Result
            </button>
        </div>
    );
};