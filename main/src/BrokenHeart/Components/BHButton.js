import React from 'react'
import '../BrokenHeart.css';

function BHButton({name, categoryConstant, setValue, setCategory}) {

    function onButtonClick() {
        const randomIndex = Math.floor(Math.random() * categoryConstant.list.length);
        setValue(categoryConstant.list[randomIndex]);
        setCategory(name.toLowerCase());
    }

    return (
        <button className='modern-button' onClick={onButtonClick}>{name}</button>
    )
}

export default BHButton