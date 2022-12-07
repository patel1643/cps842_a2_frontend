import React, {useState} from 'react'
import WrapperContainer from '../components/Shared/WrapperContainer';
import Title from '../components/Home/Title';
import Instructions from '../components/Home/Instructions';
import Checkbox from "../components/Shared/Checkbox";
import api from "../api/queries";
import { ThreeDots } from 'react-loader-spinner';


function Home() {

    // Query Setting Variables
    const [bm, setBm] = useState(false);
    const [recommendations, setRecommendations] = useState(false);

    // Search Variables
    const [searchText, setSearchText] = useState(null);

    // Query Result Variables
    const [results, setResults] = useState(null);

    // Loading State Variable
    const [loading, setLoading] = useState(false);

    const onHandleChangeBm = () => {
        setBm(!bm);
    }
    
    const onHandleChangeRecommendations = () => {
        setRecommendations(!recommendations);
    }

    const handleSearchChange = (text) => {
        setSearchText(text)
    }

    // useMemo(async () => {
    const fetchQueryResults = async () => {
        setLoading(true)
        try {
            var fetchRoute = "/fetch";
            if(!searchText || searchText === ""){
                alert("Please input a term");
                return
            }

            fetchRoute += "/"+searchText;
            
            fetchRoute += "?recommendations="+recommendations;

            if(bm){
                fetchRoute += "&bm25=true"
            }

            const response = await api.get(fetchRoute);
            setResults(response.data)
            console.log("Fetch Route",fetchRoute)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error: ${err.message}`);
            }
            setResults(null);
        }
        setLoading(false)
    }

    return (
        <WrapperContainer className="flex flex-col gap-4 lg:gap-8 lg:pt-6">
            <Title/>
            <Instructions/>

            {/* Settings */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold -mb-2">
                    Settings
                </h3>
                <div className="flex flex-col pl-6">
                    <Checkbox name={"BM 25"} defaultChecked={bm} handleChange={onHandleChangeBm} className="toggle-primary" /> <div className="text-gray-50 font-bold text-xl">{bm}</div>
                    <Checkbox name={"Recommendations"} defaultChecked={recommendations} handleChange={onHandleChangeRecommendations} className="toggle-accent" />
                </div>
            </div>
            {/************/}

            {/* Search bar */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold -mb-2">
                    Search Documents
                </h3>
                <div className="inline-flex gap-4 w-full">
                    <input onChange={(e) => handleSearchChange(e.target.value)} type="text" placeholder="Enter search query here" className="text-black input w-full" />
                    <button onClick={() => fetchQueryResults()} className="btn ">Search</button>
                </div>
            </div>
            {/************/}


            {/* Results */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold -mb-2">
                    Results
                </h3>
            </div>
            {/************/}

            {/*
                Results Section ( Includes Query components, Query Runtime, Number of Documents )
            */}
            <div className={`grid grid-cols-2 px-4 pb-8 ${loading ? 'items-center':''} gap-4`}>
                {
                    loading ?
                        <ThreeDots 
                            height="80" 
                            width="80" 
                            radius="9"
                            color="#4fa94d" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName="col-span-3"
                            visible={true}
                        />
                    : 
                        results?
                                <>
                                    <div className="col-span-2">
                                        <h3><b>Search Term:</b> {results.term}</h3>
                                        <h3><b>Query Runtime:</b> {results.runtime? results.runtime.toFixed(5)+'s' : "N/A"}</h3>
                                        <h3><b>Total matches:</b> {results.queries? results.queries.length : "N/A"}</h3>
                                    </div>
                                    {
                                        results.queries? 
                                            results.queries.map((query, index)=>{
                                                return (
                                                    <div key={`query_${index}`} className="p-4 border-black border-2 rounded-lg bg-gray-50 shadow-md text-black">
                                                        <h3><b>Doc Name:</b> {query.doc_name}</h3>
                                                        <h3><b>Doc Id:</b> {query.doc_id}</h3>
                                                        <h3><b>Reccomended Term:</b> {query.recommended_term? "True" : "False"}</h3>
                                                        <h3><b>Term:</b> {query.term}</h3>
                                                        <h3><b>First Occurence Sample:</b> {query.sample_text}</h3>
                                                    </div>
                                                )
                                            })
                                        : "No query results found"
                                    }
                                </>
                            :
                                <h3>No results to display</h3>
                }
          
            </div>
           
        </WrapperContainer>
    )
}


export default Home