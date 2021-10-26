import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import Navbar from '../components/Navbar';

function SearchMembers() {
    const [search, setSearch] = useState();



    function Search(e) {

        console.log(e.target.value);

        var data = JSON.stringify({
            "login": e.target.value,
        });

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/searchFriends',
            headers: {
                'Content-Type': 'application/json',
                "login": e.target.value,
                "client_id": "3bee3373bb7d",
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setSearch(
                    response.data.users.map((members, i) => {

                        const login = members.login;
                        const id = members.id;

                        return (


                            <div>
                                <div key={i}>{login}</div>
                                <button onClick={addFriends} title={id}>Ajouter en ami</button>
                                {/* <button onClick={removeFriends} title={id}>Retirer en ami {id}</button> */}
                                <button onClick={blockFriends} title={id}>Bloquer l'user</button>
                                <button onClick={deblockFriends} title={id}>Debloquer l'user</button>
                            </div>

                        )

                    })

                )
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    function addFriends(e) {
        console.log(e.target.title);
        var data = JSON.stringify({
            id: e.target.title,
            token: "7863c7083522",
            client_id: "f7315d8b0f29"
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/api/addFriends',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });







    }




    function blockFriends(e) {

        var axios = require('axios');
        var data = JSON.stringify({
            id: e.target.title,
            "client_id": "f7315d8b0f29",
            "token": "7863c7083522"
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/api/blockFriends',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });



    }



    function deblockFriends(e) {

        var axios = require('axios');
        var data = JSON.stringify({
            id: e.target.title,
            "client_id": "f7315d8b0f29",
            "token": "7863c7083522"
        });

        var config = {
            method: 'delete',
            url: 'http://127.0.0.1:5000/api/deblockFriends',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });



    }





    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center'}}>
                <h2 >
                    Tapez le nom d'un utilisateur !
                </h2>
                <input type="text" onChange={Search} />
                <div>{search}</div>

            </div>
        </>
    )
}

export default SearchMembers
