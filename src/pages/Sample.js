import { useState } from 'react';
import data from '../preProcessed';
export default function Sample() {

    const [sampleText, setSampleText] = useState('');
    const [results, setResults] = useState();
    const items = Object.keys(data);
    const logger= (t) => {
        setSampleText(t);
        const results = data[t];
        setResults(results);
    };
    return(
        <div className="p-4">
            
        <div className="dropdown dropdown-hover">
            <h1 className="text-lg font-semibold">{sampleText.length > 0 ? `Selected sample test : ${sampleText}` : `No sample test selected`}</h1>
  <br></br>
  <h1>Hover on the Sample test</h1>
  <label tabIndex={0} className="btn m-1">Sample tests</label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 w-96 rounded-box h-96 max-h-96 overflow-y-auto !flex-nowrap">
    {items.map((sampleWord, i) => {
        return <li key={i}><button onClick={(e) => logger(e.target.innerHTML)}>{sampleWord}</button></li>
    })}
  </ul>
  <br></br>
  <br></br>

</div>

<div className='grid grid-cols-2 gap-4'>

{
    results ?<><div className="col-span-2">
        <h3><b>Search Term:</b> {results.term}</h3>
        <h3><b>Query Runtime:</b> {results.runtime? results.runtime.toFixed(3)+'s' : "N/A"}</h3>
        <h3><b>Total matches:</b> {results.queries? results.queries.length : "N/A"}</h3>

    </div>
        
              
        {results.queries?.map((query, index)=>{
            return (
                <div key={`query_${index}`} className="p-4 border-black border-2 rounded-lg bg-gray-50 shadow-md text-black">
                            <h3><b>Doc Name:</b> {query.doc_name}</h3>
                            <h3><b>Doc Id:</b> {query.doc_id}</h3>
                            <h3><b>Reccomended Term:</b> {query.recommended_term? "True" : "False"}</h3>
                            <h3><b>Term:</b> {query.term}</h3>
                            <h3><b>First Occurence Sample:</b> {query.sample_text}</h3>
                        </div>
                    )
                })}</>
                : 
                null
                
}
                </div>
    
    </div>)
}

