import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';




function Post({ post, saisons, episodes }) {
    const genres = Object.values(post.show.genres);
    const genreSpace = genres.join(', ');
    const note = post.show.notes.mean.toFixed(2);

    console.log(post);
    console.log(saisons);
    console.log(episodes.episodes);


   
    return (
        <>
            <Navbar />

            <div className="allcards">
                <div className="article_card_main">

                    <h1 className="article_card_title">{post.show.title}</h1>
                    <img src={post.show.images.poster} alt="img"></img> <br />
                    <p className="paragraphe">nombre de saison : {post.show.seasons} <br />
                    nombre d'episode : {post.show.episodes} <br />
                    durée des episodes : {post.show.length} Min<br />
                    note : {note} / 5 <br />
                    résumé : <br />{post.show.description} <br />
                    genre : {genreSpace}
                    </p>

                </div>
                <div className="article_card_main">
                    <h1 className="article_card_title">Les saisons</h1>
                    {saisons.seasons.map((saison, i) => {
                        
                        return (
                            <>
                                <div key={i}>
                                    <p className="paragraphe">
                                        Saison : {saison.number} <br />
                                    Nombre d'Episodes : {saison.episodes} <br />
                                    </p>
                                </div>
                            </>
                        )
                    })}
                    <div className="episodes_details">
                        {episodes.episodes.map((episode, i) => {
                             if (episode.user.seen == false) {
                                var vu = "non";
                            } else {
                                var vu = "oui";
                            }
                            // 281010
                            function Watched(){
                                fetch('https://api.betaseries.com/episodes/watched?key=3bee3373bb7d&v=3.0&token=d9f7494c47b1&id=' + episode.id, {
                                    method: "POST",
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "X-BetaSeries-Key": "3bee3373bb7d",
                                        "accept": "application/ld+json"
                                    },
                                })
                                    .then((res => res.json()))
                                    .catch((e) => console.log(e))
                            
                            }
                            return (
                                <>
                        

                                    <div className="display" style={{minHeight: '250px'}}key ={i} id={episode.id}>
                                        <button onClick={() => Watched()}> Marqué comme vu</button>
                                        <img src={"https://api.betaseries.com/pictures/episodes?key=3bee3373bb7d&id=" + episode.id} style={{ borderRadius: '30px', paddingLeft: '10px', width: '200px', height: '200px', float: 'left'}}/>
                                        <div style={{textJustify: faAlignJustify}}>
                                            Vu : {vu} <br />
                                        Code : {episode.code} <br />
                                        Date de diffusion : {episode.date} <br />
                                        Note : {episode.note.moyenne} <br />
                                        Titre : {episode.title} <br />
                                        Description : <br /> {episode.description}
                                            </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                </div>

                <style jsx>
                    {`

.display  {
    width: 100%;
    padding: 50px 0;
    text-align: center;
    background-color: lightblue;
    margin-top: 20px;
}
.none {
    display: none;
}
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
    width: 50%;
    height 30%;
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

.paragraphe {
    text-align: center;
}

.link {
    text-align: center;
}

`}</style>

            </div>
        </>
    )
}
export default Post;

export async function getStaticProps({ params }) {

    const post = await fetch(`https://api.betaseries.com/shows/display?key=3bee3373bb7d&v=3.0&id=${params.id}`, {
        method: "GET",
        "header": {
            "Content-Type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        },
    })
        .then((res => res.json()))
        .catch((e) => console.log(e))

    const saisons = await fetch(`https://api.betaseries.com/shows/seasons?id=${params.id}`, {
        method: "GET",
        "headers": {
            "Content-Type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        },
    })
        .then((res => res.json()))
        .catch((e) => console.log(e))

    const episodes = await fetch(`https://api.betaseries.com/shows/episodes?id=${params.id}`, {
        method: "GET",
        "headers": {
            "Content-Type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        },
    })
        .then((res => res.json()))
        .catch((e) => console.log(e))

    return {
        props: {
            post,
            saisons,
            episodes,
        }
    }
}

export async function getStaticPaths() {

    const posts = await fetch(`http://api.betaseries.com/shows/list?key=3bee3373bb7d&v=3.0&order=popularity`, {
        method: "GET",
        "header": {
            "Content-Type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        },
    })
        .then(res => res.json())

    return {
        paths:
            posts.shows.map(post => ({
                params: { id: post.id.toString() }
            })),

        fallback: false,


    }
}

export async function getStaticPaths1() {

    const saisons = await fetch(`https://api.betaseries.com/shows/seasons?id=` + post.show.id, {
        method: "GET",
        "headers": {
            "Content-type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        }
    })
        .then(res => res.json())
        .catch((e) => console.log(e))

    return {
        paths:
            saisons.seasons.map(saison => ({
                params: { id: saison.id.toString() }
            })),
        fallback: false,
    }
}

export async function getStaticPaths2() {

    const episodes = await fetch(`https://api.betaseries.com/shows/episodes?id=${params.id}`, {
        method: "GET",
        "headers": {
            "Content-type": "application/json",
            "X-BetaSeries-Key": "3bee3373bb7d",
            "accept": "application/ld+json"
        }
    })
        .then(res => res.json())
        .catch((e) => console.log(e))

    return {
        paths:
            episodes.episodes.map(episode => ({
                params: { id: episode.id.toString() }
            })),
        fallback: false,
    }
}