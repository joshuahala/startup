import React from 'react';

export function Heroes() {

  function awesomeBtn() {
    document.getElementById('message').style.display = "none";
    randomHero();
    document.getElementById('name-him').style.display = "flex";
    
}
  return (
    <div className='body'>
      <div id='message'>
      <h3>Welcome to bit hero!</h3>
      <p>Meet your first hero! He's a level 1 right now but you can train him and level him up. As you play, you will earn more heroes with different colors. You can also have the opportunity to steal heroes from other Players! Enjoy!</p>
      <button onClick={() => awesomeBtn()}>Awesome!</button>
      </div>

      <div className='message' id='name-him'>
        <h3>Name your new hero!</h3>
        <input id="name-input" type="text"></input>
        <button onclick="saveName()">Save</button>
      </div>

      <h2>My Bit Heroes</h2>
      <div id='heroes-container'>

      </div>
    </div>
  );
}