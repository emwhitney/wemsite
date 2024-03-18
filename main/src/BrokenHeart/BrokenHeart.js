import React, { useState } from 'react'
import { BrokenHeartConsts } from './Categories';
import BHButton from './Components/BHButton';
import Vent from './Components/Vent';
import './BrokenHeart.css';
import Communication from './Components/Communication';
import CopeAhead from './Components/CopeAhead';

function BrokenHeart() {
    const {VENT, REGULATE, WISDOM, AFFIRM, READ, MEMES} = BrokenHeartConsts;
    const [vent, setVent] = useState(VENT.list[0]);
    const [regulate, setRegulate] = useState(REGULATE.list[0]);
    const [affirm, setAffirm] = useState(AFFIRM.list[0]);
    const [wisdom, setWisdom] = useState(WISDOM.list[0]);
    const [shownCategory, setShownCategory] = useState('vent');

    function onButtonClick() {
        const randomIndex = Math.floor(Math.random() * VENT.list.length);
        setVent(VENT.list[randomIndex]);
    }

    const categoryMap = {
        vent: vent,
        regulate: regulate,
        affirm: affirm,
        wisdom: wisdom.quote + ' -- ' + wisdom.author
    };

    return (
        <div>
            <h1 className="center-text">******</h1>
            <p>I need to:</p>
            <div className="button-container">
                <BHButton name="Vent" categoryConstant={VENT} setValue={setVent} setCategory={setShownCategory} />
                <BHButton name="Regulate" categoryConstant={REGULATE} setValue={setRegulate} setCategory={setShownCategory} />
                <BHButton name="Affirm" categoryConstant={AFFIRM} setValue={setAffirm} setCategory={setShownCategory} />
                <BHButton name="Wisdom" categoryConstant={WISDOM} setValue={setWisdom} setCategory={setShownCategory} />
            </div>
        

            <p className='center-text'>{categoryMap[shownCategory]}</p>

            <p>I'm struggling with difficult thoughts:</p>
            <Vent />

            <p>I need help communicating:</p>
            <Communication />
            <p>I need help coping for a difficult situation:</p>
            <CopeAhead />
            <p>I need to read about heartbreak:</p>
            <p>Transforming attachment into love</p>
            <p>Show me memes</p>
        </div>
    )
}

export default BrokenHeart