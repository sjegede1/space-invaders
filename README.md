<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>SPACE INAVDERS VIDEOGAME</h1>
    <h2>Outline</h2>
    <h3>HTML Design</h3>
    <ul>
      <li>
        Have large div to display my screen. Any characters or enemeies will be
        contained inside of it
        <ul>
            <li>Use offsetX and offsetY to control movement and position elements within the div</li>
        </ul>
      </li>
      <li>Have a section explaining the rules and how to play</li>
      <li><strong>BONUS: </strong>Scale the screen for mobile play both landscape and potrait</li>
    </ul>
    <h3>Javascript</h3>
    <ul>
        <li>Player Class
            <ul>
                <li>Method to track player posititon</li>
                <li>Method to move the player around (must boun d player within playable area)</li>
                <li>Method to shoot</li>
                <li>Property to track health</li>
                <li>Property to track attack power</li>
            </ul>
        </li>
        <li>Enemy Class
            <ul>
                <li>Properties: Health, Attack power, speed</li>
                
            </ul>
        </li>
        <li>Weapons Class
            <ul>
                <li>Create 3 different types of weapons for Player</li>
                <li>Create 1 weapons for each type of enemy</li>
                <li>Multiple weapons for the boss</li>
            </ul>
        </li>
    </ul>
  </body>
</html>
