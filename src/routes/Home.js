import React from 'react'
import { useEffect, useState } from 'react';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService } from 'fbase';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);
    
    return (
        <div className='container'>
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (  // map: 배열을 순회하기 위한 ES6 함수. nweets 배열을 순회하면서 jsx를 반환
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
