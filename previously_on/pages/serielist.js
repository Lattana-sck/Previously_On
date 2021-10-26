import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


export async function getServerSideProps() {

    
    const res = await fetch('http://localhost:3000/api/serieslist', {

        method: "GET",
        "header": {
            "Content-Type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        },
    })
    
    
    const data = await res.json()
    return {
        props: { series: data }
    }
}


function SerieList({ series }) {

    var pressTimer;
    const router = useRouter();

    function add(data) {
        const token = localStorage.getItem("token");
        const option = { 
            id: data.toString(),
            token: token }

        fetch('https://api.betaseries.com/shows/show?v=3.0&key=3bee3373bb7d', {
            method: "POST",
            "headers": {
                "Content-Type": "application/json",
                "X-BetaSeries-Version": "3.0",
                "accept": "application/json",
            },
            body: JSON.stringify(option)
        })
        .then(r => {console.log(r)})
        .catch(e => {
            console.log(e);
        })
    }
    function Up() {
        clearTimeout(pressTimer)
    }
    function Down(id) {
        // Set timeout
        let idserie = id;
        pressTimer = window.setTimeout(() => {
            let url = "/" + idserie;
            router.push(url)
        }, 1000);
    }

console.log(series);
    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Les séries a découvrir</h1>
            <div className="allcards">
                {series.shows.map((data, i) => {
                    return (

                        <div key={i}>
                            <div className="article_card_main">
                                <h5 className="article_card_title"> {data.title}</h5>
                                <img src={data.images.poster} alt="Card image cap" />
                                
                                <button id='button' onMouseDown={() => { Down(data.id) }} onMouseUp={() => { Up() }} onClick={() => { add(data.id) }}>
                                <FontAwesomeIcon icon={ faPlus }/>
                                        </button>
                                
                            </div>
                        </div>
                    )
                })}
            </div>




            <style jsx>{`

.allcards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;    
}            

.article_card_main {
    
    flex-direction: column;
    align-items: center;
    border-radius: 10px 10px 10px 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 2px 2px 8px 2px;
    margin-left: 10px;
    width: 300px;
    height 300px;
}

.article_card_main img {
        width: 70%;
        height: 80%;
        text-align:center;
        margin:auto;
        display:flex;
}

.article_card_main_premium img {
                width: 30%;
}

.article_card_title {
    text-align: center;
}

.link {
    text-align: center;
}

`}</style>

        </div>
    )
}
export default SerieList;