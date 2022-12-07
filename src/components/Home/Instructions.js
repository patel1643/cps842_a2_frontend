import React from 'react'

const instruction = [
    { text:"Select Options" },
    { text:"Search the term" },
    { text:"Wait for results" },
]

function Instructions() {
    return (
        <div className="flex flex-col gap-2 text-center md:text-start">
            <h3 className="text-xl font-semibold">
                Instructions
            </h3>
            <div className="pl-6 flex flex-col gap-1">
                { 
                    instruction.map(
                        (instruction, index) => <p key={index+1}>{index+1}. {instruction.text}</p>
                    )
                }
            </div>

        </div>

    )
}

export default Instructions