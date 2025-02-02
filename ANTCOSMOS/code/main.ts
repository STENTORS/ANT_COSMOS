
import kaboom from "kaboom"
import "kaboom/global"

// initialize context
kaboom({
  font: "font",
  backgroundAudio: true,
})

// load assets
loadSprite("ant", "sprites/ant.png")
loadSprite("spider", "sprites/spider.png")
loadSprite("worm", "sprites/worm.png")
loadSprite("dirt", "sprites/dirt.png")
loadSprite("web", "sprites/web.png")
loadSprite("background", "sprites/field.jpg")
loadSprite("anteater", "sprites/anteater.png")
loadSprite("beetle", "sprites/beetle.png")
loadSprite("tree", "sprites/tree.png")
loadFont("font", "font/font.otf")
loadSound("backgroundSound", "sounds/grip of nature.ogg")
loadSound("score", "sounds/rise.mp3")
loadSound("swish", "sounds/swish_2.mp3")
loadSound("swish1", "sounds/swish_3.mp3")
loadSound("swish2", "sounds/swish_4.mp3")
loadSound("click", "sounds/click_sound_1.mp3")

onUpdate(() => setCursor("default"))

const music = play("backgroundSound", {
  loop: true,
})
music.play()

function addButton(txt, p, find) {
  const btn = add([
    rect(240, 80, { radius: 8 }),
    pos(p),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
    color(34, 139, 34),
  ])
  btn.add([
    text(txt),
    anchor("center"),
    color(0, 0, 0)
  ])
  btn.onHoverUpdate(() => {
    btn.color = rgb(107, 142, 35)
    btn.scale = vec2(1.2)
    setCursor("pointer")
  })
  btn.onHoverEnd(() => {
    btn.scale = vec2(1)
    btn.color = rgb(34, 150, 30)
  })
  btn.onClick(() => play("click"))
  btn.onClick(find)
  return btn
}
function addQuestionButton(txt, p, find) {
  const btn = add([
    rect(700, 95, { radius: 8 }),
    pos(p),
    area(),
    scale(1),
    anchor("center"),
    outline(4),
    color(34, 139, 34),
  ])
  btn.add([
    text(txt),
    anchor("center"),
    color(0, 0, 0)
  ])
  btn.onHoverUpdate(() => {
    btn.color = rgb(107, 142, 35)
    btn.scale = vec2(1.2)
    setCursor("pointer")
  })
  btn.onHoverEnd(() => {
    btn.scale = vec2(1)
    btn.color = rgb(34, 150, 30)
  })
  btn.onClick(() => play("click"))
  btn.onClick(find)
  return btn
}
function addWorm(x, y) {
  const worm = add([
    sprite("worm"),
    pos(x, y),
    area(),
    anchor("center"),
    "worm"
  ])
}
function addTrees() {
  add([
    sprite("tree"),
    pos(width() / 2 - 600, height() / 2 - 180),
  ])
  add([
    sprite("tree"),
    pos(width() / 2 - 450, height() / 2 - 180),
  ])
  add([
    sprite("tree"),
    pos(width() / 2 - 100, height() / 2 - 180),
  ])
  add([
    sprite("tree"),
    pos(width() / 2 + 200, height() / 2 - 180),
  ])
  add([
    sprite("tree"),
    pos(width() / 2 + 600, height() / 2 - 180),
  ])

}
function spinSprite(thing, where, speed) {
  const spin = add([
    sprite(thing),
    pos(where),
    rotate(0),
    anchor("center"),
  ])
  spin.onUpdate(() => {
    spin.angle += speed * dt()
  })
}

scene("start", () => {
  add([
    sprite("background", { width: width(), height: height() })
  ])
  add([
    text("ANT_COSMOS_", { size: 50 }),
    pos(width() / 2, height() / 2 - 50),
    anchor("center"),
    color(34, 139, 34),
  ])
  addButton("Start", vec2(width() / 2, height() / 2 + 70), () => go("levelOneInfo"))
  addButton("Tutorial", vec2(width() / 2, height() / 2 + 170), () => go("tutorial"))
});

let currentLevel = null
let levelNum = null
let nextLevel = null
let done = false

scene("win", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })
  add([
    sprite("background", { width: width(), height: height() })
  ])
  add([
    text("You Win!", { size: 50 }),
    pos(width() / 2, height() / 2 - 50),
    anchor("center"),
    color(34, 139, 34),
  ])
  addButton(levelNum, vec2(width() / 2, height() / 2 + 70), () => go(nextLevel))

});
scene("lose", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })
  add([
    sprite("background", { width: width(), height: height() })
  ])
  add([
    text("You Lost!", { size: 50 }),
    pos(width() / 2, height() / 2 - 50),
    anchor("center"),
    color(34, 139, 34),
  ])
  addButton("Home", vec2(width() / 2, height() / 2 + 70), () => go("start"))
  addButton("Restart", vec2(width() / 2, height() / 2 + 180), () => go(currentLevel))
});
scene("tutorial", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })

  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])
  add([
    text("ANT_COSMOS_", { size: 50 }),
    pos(width() / 2, height() / 2 - 180),
    anchor("center"),
    color(0, 0, 0),
  ])
  add([
    text("Create a nest for your ant by destroying the dirt blocks:", { size: 40 }),
    pos(width() / 2, height() / 2 - 100),
    anchor("center"),
    color(0, 0, 0),
  ])
  add([
    text("A(left) S(down) D(right)", { size: 40 }),
    pos(width() / 2, height() / 2 - 40),
    anchor("center"),
    color(0, 0, 0),
  ])
  add([
    text("To move your ant, press the arrow keys < ^ >", { size: 40 }),
    pos(width() / 2, height() / 2 + 20),
    anchor("center"),
    color(0, 0, 0),
  ])
  add([
    text("Collide with mealworms to collect", { size: 40 }),
    pos(width() / 2, height() / 2 + 80),
    anchor("center"),
    color(0, 0, 0),
  ])
  add([
    text("After completing a level, answer question to contiue", { size: 40 }),
    pos(width() / 2, height() / 2 + 140),
    anchor("center"),
    color(0, 0, 0),
  ])

  addButton("Back", vec2(width() / 2, height() / 2 + 250), () => go("start"))

});
scene("finish", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("e" || "E", () => {
    if (done) {
      go("gameLevelExtreme");
    }
  })

  add([
    sprite("background", { width: width(), height: height() })
  ])
  add([
    text("WOOOOO [wavy]YOU FINISHED!![/wavy] WOOOOO", {
      styles: {
        "wavy": (idx) => ({
          pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
        }),
      },
      size: 50,
    }),
    pos(400, 200),
    color(34, 139, 34),
  ])
  addButton("Home", vec2(width() / 2, height() / 2 + 70), () => go("start"))
});
scene("bossLevelFinish", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  add([
    sprite("background", { width: width(), height: height() })
  ])
  add([
    text("WOOOOO [wavy]YOU FINISHED!![/wavy] WOOOOO", {
      styles: {
        "wavy": (idx) => ({
          pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
        }),
      },
      size: 50,
    }),
    pos(400, 200),
    color(34, 139, 34),
  ])
  spinSprite("worm", vec2(width() / 2, height() / 2 - 200), 120)
  spinSprite("ant", vec2(width() / 2 - 200, height() / 2 + 250), 250)
  spinSprite("spider", vec2(width() / 2 + 200, height() / 2 - 40), 50)
  spinSprite("beetle", vec2(width() / 2 - 200, height() / 2 - 100), 170)
  spinSprite("anteater", vec2(width() / 2 + 350, height() / 2 + 12), 230)
  addButton("Home", vec2(width() / 2, height() / 2 + 70), () => go("start"))
})

//game information pages
scene("levelOneInfo", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])

  add([
    text("Level_One_", { size: 70 }),
    color(0, 0, 0),
    pos(width() / 2, height() / 2 - 300),
    anchor("center"),
  ])

  add([
    sprite("worm"),
    pos(width() / 2 - 700, height() / 2 - 200),
  ])
  add([
    text("The queen ant needs protein so dig and explore to find 5 mealworms\nThe [b]mealworm are the larval form of the yellow mealworm beetle[/b].",
      {
        size: 25,
        styles: {
          "b": () => ({
            scale: 1.15,
          }),
        },
      }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 195),
  ])
  add([
    sprite("ant"),
    pos(width() / 2 - 700, height() / 2 - 100),
  ])
  add([
    text("You are playing the meadow ant and have to aviod predators and collect mealworms.\nMeadow ants feed on small insects and commonly nest in soil and under rocks.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 85),
  ])
  add([
    sprite("spider"),
    pos(width() / 2 - 750, height() / 2),
  ])
  add([
    text("Lynx spider are distributed worldwide and commonly in North America. \nLynx spiders are very fast, good at leaping, alert and have good vision.\nThey rely on their keen eyesight for stalking, chasing, and ambushing prey such as ants.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 + 35),
  ])

  addButton("Play", vec2(width() / 2, height() / 2 + 250), () => go("gameLevelOne"))
  onKeyPress("p", () => {
    go("gameLevelOne");
  })

});
scene("levelTwoInfo", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])

  add([
    text("Level_Two_", { size: 70 }),
    color(0, 0, 0),
    pos(width() / 2, height() / 2 - 300),
    anchor("center"),
  ])

  add([
    sprite("ant"),
    pos(width() / 2 - 700, height() / 2 - 100),
  ])
  add([
    text("You are playing the meadow ant and have to aviod predators and collect mealworms.\nMeadow ants feed on small insects and commonly nest in soil and under rocks.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 85),
  ])

  add([
    sprite("worm"),
    pos(width() / 2 - 700, height() / 2 - 200),
  ])
  add([
    text("The queen ant needs protein so dig and explore to find 7 mealworms\nThe mealworm are the larval form of the yellow mealworm beetle.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 195),
  ])

  add([
    sprite("spider"),
    pos(width() / 2 - 750, height() / 2),
  ])
  add([
    text("Lynx spider are distributed worldwide and commonly in North America. \nLynx spiders are very fast, good at leaping, alert and have good vision.\nThey rely on their keen eyesight for stalking, chasing, and ambushing prey such as ants.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 + 35),
  ])

  add([
    sprite("anteater"),
    pos(width() / 2 - 750, height() / 2 + 170),
  ])
  add([
    text("Anteaters use their [b]tongues as their primary tool for gathering food[/b] they also have sharp claws to defend themselves.\nWhen it comes to land-dwelling mammals, the anteater has the lowest body temperature, at approximately 32 C.\nAviod the anteaters whilst gathering worms.", {
      size: 25,
      styles: {
        "b": () => ({
          scale: 1.15,
        }),
      },
    }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 + 170),
  ])

  addButton("Play", vec2(width() / 2, height() / 2 + 310), () => go("gameLevelTwo"))
  onKeyPress("p", () => {
    go("gameLevelTwo");
  })
});
scene("levelThreeInfo", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])

  add([
    text("Level_Three_", { size: 70 }),
    color(0, 0, 0),
    pos(width() / 2, height() / 2 - 310),
    anchor("center"),
  ])

  add([
    sprite("worm"),
    pos(width() / 2 - 700, height() / 2 - 250),
  ])
  add([
    text("The queen ant needs protein so dig and explore to find 10 mealworms\nThe mealworm are the larval form of the yellow mealworm beetle.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 245),
  ])


  add([
    sprite("ant"),
    pos(width() / 2 - 700, height() / 2 - 185),
  ])
  add([
    text("You are playing the meadow ant and have to aviod predators and collect mealworms.\nMeadow ants feed on small insects and commonly nest in soil and under rocks.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 175),
  ])

  add([
    sprite("spider"),
    pos(width() / 2 - 750, height() / 2 - 100),
  ])
  add([
    text("Lynx spider are distributed worldwide and commonly in North America. \nLynx spiders are very fast, good at leaping, alert and have good vision.\nThey rely on their keen eyesight for stalking, chasing, and ambushing prey such as ants.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 - 80),
  ])

  add([
    sprite("anteater"),
    pos(width() / 2 - 750, height() / 2 + 50),
  ])
  add([
    text("Anteaters use their tongues as their primary tool for gathering food they also have sharp claws to defend themselves.\nWhen it comes to land-dwelling mammals, the anteater has the lowest body temperature, at approximately 32 C.\nAviod the anteaters whilst gathering worms.", { size: 25 }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 + 50),
  ])

  add([
    sprite("beetle"),
    pos(width() / 2 - 725, height() / 2 + 160),
  ])
  add([
    text("Ant nest beetles live within the nest of ants and [b]feed on the ant colonies larvea and worker ants.[/b]\nThe Beetles have hairs that produce a scent that lure the ants to them.\nMake sure that your nest is complex to make it hard for the beetle to get to you as they can crawl into your nest to attack.", {
      size: 25,
      styles: {
        "b": () => ({
          scale: 1.15,
        }),
      },
    }),
    color(0, 0, 0),
    pos(width() / 2 - 590, height() / 2 + 160),
  ])

  addButton("Play", vec2(width() / 2, height() / 2 + 310), () => go("gameLevelThree"))
  onKeyPress("p", () => {
    go("gameLevelThree");
  })
});

//multiple choice questions
scene("levelOneQuestions", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])
  add([
    text("What are mealworms?", { size: 50 }),
    pos(width() / 2, height() / 2 - 300),
    anchor("center"),
    color(0, 0, 0),
  ])
  addQuestionButton("Larva from yellow mealworm beetles", vec2(width() / 2, height() / 2 - 200), () => go("win"))
  addQuestionButton("Larva from yellow mealworms", vec2(width() / 2, height() / 2 - 80), () => go("lose"))
  addQuestionButton("Larva from red mealworm beetle", vec2(width() / 2, height() / 2 + 40), () => go("lose"))
  addQuestionButton("Larva from carpenter ants", vec2(width() / 2, height() / 2 + 170), () => go("lose"))
});
scene("levelTwoQuestions", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])
  add([
    text("What are anteaters primary tool for hunting?", { size: 50 }),
    pos(width() / 2, height() / 2 - 300),
    anchor("center"),
    color(0, 0, 0),
  ])
  addQuestionButton("Sharp claws to distroy ants nests", vec2(width() / 2, height() / 2 - 200), () => go("lose"))
  addQuestionButton("The low body heat to not be detected", vec2(width() / 2, height() / 2 - 80), () => go("lose"))
  addQuestionButton("Tongues to reach the ants nest", vec2(width() / 2, height() / 2 + 40), () => go("win"))
  addQuestionButton("Arms to collect and hold ants and food", vec2(width() / 2, height() / 2 + 170), () => go("lose"))
});
scene("levelThreeQuestions", () => {
  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })
  add([
    rect(width(), height()),
    color(85, 107, 47),
  ])
  add([
    text("What do ant nest beetles feed on?", { size: 50 }),
    pos(width() / 2, height() / 2 - 300),
    anchor("center"),
    color(0, 0, 0),
  ])
  addQuestionButton("The ant larvea in the ants nest", vec2(width() / 2, height() / 2 - 200), () => go("lose"))
  addQuestionButton("The queen ant of the ants nest", vec2(width() / 2, height() / 2 - 80), () => go("lose"))
  addQuestionButton("The queen and worker ants of the nest", vec2(width() / 2, height() / 2 + 40), () => go("lose"))
  addQuestionButton("The larvea and the worker ants of the nest", vec2(width() / 2, height() / 2 + 170), () => go("finish"))
});

//Game levels
scene("gameLevelOne", () => {
  currentLevel = "levelOneInfo"
  nextLevel = "levelTwoInfo"
  levelNum = "Level Two"
  const SPEED = 200
  setGravity(1000)

  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })

  //background stuff
  add([
    sprite("background"),
  ])
  addTrees()

  const rectDirt = add([
    pos(0, 323),
    rect(1700, 550),
    outline(5),
    color(139, 69, 19),
    area(),
  ])

  addWorm(100, 308)
  addWorm(1000, 308)
  addWorm(300, 500)
  addWorm(600, 600)
  addWorm(1200, 560)

  const blockSize = 80;
  const map = addLevel(
    [
      "-                    -",
      "-                    -",
      "-                    -",
      "-                    -",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "----------------------",
      "----------------------",
    ],
    {
      tileWidth: blockSize,
      tileHeight: blockSize,
      pos: vec2(-blockSize, 0),
      tiles: {
        "+": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "dirt",
          {
            blockId: 0,
          }
        ],
        "-": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "edge"
        ],

      },
    }
  );

  let currentLeftTile = null
  let currentRightTile = null
  let currentBottomTile = null
  let score = 0;

  const player = add([
    sprite("ant"),
    pos(1205, 200),
    area(),
    body({ isStatic: false }),
    "player"
  ])

  wait(1.5, () => {
    if (player.pos.x == 1200 || player.pos.y == 200) {
      const hintText = add([
        text("Use the arrow keys to move the ant\nUse A S D to dig", { size: 30 }),
        pos(1000, 200),
        color(96, 96, 96),
        "hintText",
      ])
      wait(2, () => {
        destroy(hintText)
      })
    }
  })



  //spider movement
  const spider = add([
    sprite("spider"),
    pos(300, 0),
    area(),
    body({ isStatic: true }),
    "spider"
  ])

  onUpdate("spider", (spider) => {
    spider.pos.x = player.pos.x

  })

  wait(3, () => {
    loop(3, () => {
      if (player.pos.y <= 260) {
        const web = add([
          sprite("web"),
          pos(player.pos.x, 250),
          area(),
          body({ isStatic: false }),
          "web"
        ])
        wait(3, () => {
          destroy(web)
        })
      }
    })
  })

  player.onCollide("web", () => {
    play("swish1");
    wait(0.2, () => {
      go("lose");
    })
  })

  player.onCollide("worm", (worm) => {
    play("score");
    destroy(worm);
    score++;
    scoreLabel.text = "Score: " + score;
    scoreLabel.pos = vec2(0, 0);
    if (score === 5) {
      wait(0.3, () => {
        go("levelOneQuestions");
      })
    }
  });


  let scoreLabel = add([
    text("Score: " + score, {
      size: 30,
    }),
    pos(0, 0),
    color(0, 0, 0)
  ]);

  //ant movement 
  onKeyDown("left", () => {
    player.move(-SPEED, 0)
  })
  onKeyDown("right", () => {
    player.move(SPEED, 0)
  })

  onKeyDown("a", () => {
    //debug.showLog = true
    //debug.inspect = true
    if (!(currentLeftTile === null) && player.isColliding(currentLeftTile)) {
      destroy(currentLeftTile)
      currentLeftTile = null
    }
  })

  onKeyDown("s", () => {
    if (!(currentBottomTile === null) && player.isColliding(currentBottomTile)) {
      destroy(currentBottomTile)
      currentBottomTile = null
    }
  })

  onKeyDown("d", () => {
    if (!(currentRightTile === null) && player.isColliding(currentRightTile)) {
      destroy(currentRightTile)
      currentRightTile = null
    }
  })

  player.onCollide("dirt", () => {
    onKeyPress("up", () => {
      if (player.pos.y > 300) {
        player.jump(600)
      }
    })
  })

  player.onCollide("dirt", (tile, col) => {
    if (col.isLeft()) {
      currentLeftTile = tile

    } else if (col.isRight()) {
      currentRightTile = tile

    } else {
      currentBottomTile = tile
    }

  })
});
scene("gameLevelTwo", () => {
  currentLevel = "levelTwoInfo"
  levelNum = "Level Three"
  nextLevel = "levelThreeInfo"
  const SPEED = 200
  setGravity(1000)

  add([
    sprite("background"),
  ])
  addTrees()

  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })

  const rectDirt = add([
    pos(0, 323),
    rect(1700, 550),
    outline(5),
    color(139, 69, 19),
    area(),
  ])

  addWorm(50, 308)
  addWorm(200, 308)
  addWorm(650, 308)
  addWorm(1250, 308)

  addWorm(350, 550)
  addWorm(650, 620)
  addWorm(1200, 560)


  const blockSize = 80;
  const map = addLevel(
    [
      "-                    -",
      "-                    -",
      "-                    -",
      "-                    -",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "----------------------",
      "----------------------",
    ],
    {
      tileWidth: blockSize,
      tileHeight: blockSize,
      pos: vec2(-blockSize, 0),
      tiles: {
        "+": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "dirt",
          {
            blockId: 0,
          }
        ],
        "-": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "edge"
        ],

      },
    }
  );

  let currentLeftTile = null
  let currentRightTile = null
  let currentBottomTile = null
  let score = 0;

  const player = add([
    sprite("ant"),
    pos(750, 200),
    area(),
    body({ isStatic: false }),
    "player"
  ])


  //spider movement
  const spider = add([
    sprite("spider"),
    pos(300, 0),
    area(),
    body({ isStatic: true }),
    "spider"
  ])

  const anteater = add([
    sprite("anteater"),
    pos(350, 240),
    area(),
    "anteater"
  ])

  onUpdate("spider", (spider) => {
    spider.pos.x = player.pos.x
  })


  let direction = null
  onUpdate("anteater", (anteater) => {
    if (anteater.pos.x > 1440) {
      direction = "left"
      anteater.flipX = false;
    }
    if (anteater.pos.x < 5) {
      direction = "right"
      anteater.flipX = true;
    }
    if (direction === "right") {
      anteater.move(300, 0)
    } else {
      anteater.move(-300, 0)
    }
  })

  wait(1, () => {
    player.onCollide("anteater", () => {
      play("swish");
      wait(0.2, () => {
        go("lose");
      })
    })
  })

  wait(2, () => {
    loop(3, () => {
      if (player.pos.y <= 260) {
        const web = add([
          sprite("web"),
          pos(player.pos.x, 250),
          area(),
          body({ isStatic: false }),
          "web"
        ])
        wait(3, () => {
          destroy(web)
        })
      }
    })
  })

  player.onCollide("web", () => {
    play("swish1");
    wait(0.2, () => {
      go("lose");
    })
  })

  player.onCollide("worm", (worm) => {
    play("score");
    destroy(worm);
    score++;
    scoreLabel.text = "Score: " + score;
    scoreLabel.pos = vec2(0, 0);
    if (score === 7) {
      wait(0.3, () => {
        go("levelTwoQuestions");
      })
    }
  });

  let scoreLabel = add([
    text("Score: " + score, {
      size: 30,
    }),
    pos(0, 0),
    color(0, 0, 0)
  ]);

  //ant movement 
  onKeyDown("left", () => {
    player.move(-SPEED, 0)
  })
  onKeyDown("right", () => {
    player.move(SPEED, 0)
  })

  onKeyDown("a", () => {
    if (!(currentLeftTile === null) && player.isColliding(currentLeftTile)) {
      destroy(currentLeftTile)
      currentLeftTile = null
    }
  })

  onKeyDown("s", () => {
    if (!(currentBottomTile === null) && player.isColliding(currentBottomTile)) {
      destroy(currentBottomTile)
      currentBottomTile = null
    }
  })

  onKeyDown("d", () => {
    if (!(currentRightTile === null) && player.isColliding(currentRightTile)) {
      destroy(currentRightTile)
      currentRightTile = null
    }
  })

  player.onCollide("dirt", () => {
    onKeyPress("up", () => {
      if (player.pos.y > 300) {
        player.jump(600)
      }
    })
  })

  player.onCollide("dirt", (tile, col) => {
    if (col.isLeft()) {
      currentLeftTile = tile

    } else if (col.isRight()) {
      currentRightTile = tile

    } else {
      currentBottomTile = tile
    }

  })
});
scene("gameLevelThree", () => {
  currentLevel = "levelThreeInfo"
  const SPEED = 200
  setGravity(1000)

  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })

  add([
    sprite("background"),
  ])
  addTrees()

  const rectDirt = add([
    pos(0, 323),
    rect(1700, 550),
    outline(5),
    color(139, 69, 19),
    area(),
  ])

  addWorm(50, 308)
  addWorm(400, 308)
  addWorm(850, 308)
  addWorm(550, 308)
  addWorm(1200, 308)

  addWorm(300, 450)
  addWorm(450, 500)
  addWorm(80, 600)
  addWorm(500, 525)
  addWorm(1230, 560)

  const blockSize = 80;
  const map = addLevel(
    [
      "-                    -",
      "-                    -",
      "-                    -",
      "-                    -",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "----------------------",
      "----------------------",
    ],
    {
      tileWidth: blockSize,
      tileHeight: blockSize,
      pos: vec2(-blockSize, 0),
      tiles: {
        "+": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "dirt",
          {
            blockId: 0,
          }
        ],
        "-": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "edge"
        ],

      },
    }
  );

  let currentLeftTile = null
  let currentRightTile = null
  let currentBottomTile = null
  let score = 0;

  const player = add([
    sprite("ant"),
    pos(750, 200),
    area(),
    body({ isStatic: false }),
    "player"
  ])


  //spider movement
  const spider = add([
    sprite("spider"),
    pos(300, 0),
    area(),
    body({ isStatic: true }),
    "spider"
  ])

  const anteater = add([
    sprite("anteater"),
    pos(450, 240),
    area(),
    "anteater"
  ])

  const beetle = add([
    sprite("beetle"),
    pos(450, 220),
    body(),
    area(),
    "beetle"
  ])


  onUpdate("spider", (spider) => {
    spider.pos.x = player.pos.x
  })

  onUpdate("beetle", (beetle) => {
    if (player.pos.x < beetle.pos.x) {
      beetle.move(-50, 0);
    } else {
      beetle.move(50, 0);
    }

    if (player.pos.y < beetle.pos.y) {
      beetle.move(0, -100);
    } else {
      beetle.move(0, 100);
    }
  });

  player.onCollide("beetle", () => {
    play("swish2")
    wait(0.2, () => {
      go("lose");
    })
  })

  let direction = null
  onUpdate("anteater", (anteater) => {
    if (anteater.pos.x > 1440) {
      direction = "left"
      anteater.flipX = false;
    }
    if (anteater.pos.x < 5) {
      direction = "right"
      anteater.flipX = true;
    }
    if (direction === "right") {
      anteater.move(300, 0)
    } else {
      anteater.move(-300, 0)
    }
  })

  wait(1, () => {
    player.onCollide("anteater", () => {
      play("swish");
      wait(0.2, () => {
        go("lose");
      })
    })
  })

  wait(2, () => {
    loop(2.5, () => {
      if (player.pos.y <= 260) {
        const web = add([
          sprite("web"),
          pos(player.pos.x, 250),
          area(),
          body({ isStatic: false }),
          "web"
        ])
        wait(3, () => {
          destroy(web)
        })
      }
    })
  })

  player.onCollide("web", () => {
    play("swish1")
    wait(0.2, () => {
      go("lose");
    })
  })

  player.onCollide("worm", (worm) => {
    play("score");
    destroy(worm);
    score++;
    scoreLabel.text = "Score: " + score;
    scoreLabel.pos = vec2(0, 0);
    if (score === 10) {
      done = true
      wait(0.3, () => {
        go("levelThreeQuestions");
      })
    }
  });

  let scoreLabel = add([
    text("Score: " + score, {
      size: 30,
    }),
    pos(0, 0),
    color(0, 0, 0)
  ]);

  //ant movement 
  onKeyDown("left", () => {
    player.move(-SPEED, 0)
  })
  onKeyDown("right", () => {
    player.move(SPEED, 0)
  })

  onKeyDown("a", () => {
    if (!(currentLeftTile === null) && player.isColliding(currentLeftTile)) {
      destroy(currentLeftTile)
      currentLeftTile = null
    }
  })

  onKeyDown("s", () => {
    if (!(currentBottomTile === null) && player.isColliding(currentBottomTile)) {
      destroy(currentBottomTile)
      currentBottomTile = null
    }
  })

  onKeyDown("d", () => {
    if (!(currentRightTile === null) && player.isColliding(currentRightTile)) {
      destroy(currentRightTile)
      currentRightTile = null
    }
  })

  player.onCollide("dirt", () => {
    onKeyPress("up", () => {
      if (player.pos.y > 300) {
        player.jump(600)
      }
    })
  })

  player.onCollide("dirt", (tile, col) => {
    if (col.isLeft()) {
      currentLeftTile = tile

    } else if (col.isRight()) {
      currentRightTile = tile

    } else {
      currentBottomTile = tile
    }

  })
});
scene("gameLevelExtreme", () => {
  currentLevel = "gameLevelExtreme"
  const SPEED = 200
  setGravity(1000)

  onKeyPress("h" || "escape", () => {
    go("start")
  })
  onKeyPress("r" || "R", () => {
    go(currentLevel);
  })

  add([
    sprite("background"),
  ])
  addTrees()

  const rectDirt = add([
    pos(0, 323),
    rect(1700, 550),
    outline(5),
    color(139, 69, 19),
    area(),
  ])

  addWorm(50, 308)
  addWorm(400, 308)
  addWorm(250, 308)
  addWorm(550, 308)
  addWorm(650, 308)

  addWorm(300, 450)
  addWorm(450, 500)
  addWorm(80, 450)
  addWorm(500, 525)
  addWorm(1230, 560)

  const blockSize = 80;
  const map = addLevel(
    [
      "-                    -",
      "-                    -",
      "-                    -",
      "-                    -",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "-+++++++++++++++++++--",
      "----------------------",
      "----------------------",
    ],
    {
      tileWidth: blockSize,
      tileHeight: blockSize,
      pos: vec2(-blockSize, 0),
      tiles: {
        "+": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "dirt",
          {
            blockId: 0,
          }
        ],
        "-": () => [
          sprite("dirt"),
          area(),
          body({ isStatic: true }),
          "edge"
        ],

      },
    }
  );

  let currentLeftTile = null
  let currentRightTile = null
  let currentBottomTile = null
  let score = 0;

  const player = add([
    sprite("ant"),
    pos(750, 170),
    area(),
    body({ isStatic: false }),
    "player"
  ])


  //spider movement
  const spider = add([
    sprite("spider"),
    pos(300, 0),
    area(),
    body({ isStatic: true }),
    "spider"
  ])

  const spider1 = add([
    sprite("spider"),
    pos(300, 0),
    area(),
    body({ isStatic: true }),
    "spider1"
  ])

  const anteater = add([
    sprite("anteater"),
    pos(450, 240),
    area(),
    "anteater"
  ])

  const beetle = add([
    sprite("beetle"),
    pos(450, 220),
    body(),
    area(),
    "beetle"
  ])


  onUpdate("spider", (spider) => {
    spider.pos.x = player.pos.x + 100
  })

  onUpdate("spider1", (spider1) => {
    spider1.pos.x = player.pos.x - 100
  })

  onUpdate("beetle", (beetle) => {
    if (player.pos.x < beetle.pos.x) {
      beetle.move(-140, 0);
    } else if (player.pos.x > beetle.pos.x) {
      beetle.move(140, 0);
    }

    if (player.pos.y < beetle.pos.y) {
      beetle.move(0, -700);
    } else if (player.pos.y > beetle.pos.y) {
      beetle.move(0, 700);
    }
  });

  player.onCollide("beetle", () => {
    play("swish2")
    wait(0.2, () => {
      go("lose");
    })
  })

  let direction = null
  onUpdate("anteater", (anteater) => {
    if (anteater.pos.x > 1440) {
      direction = "left"
      anteater.flipX = false;
    }
    if (anteater.pos.x < 5) {
      direction = "right"
      anteater.flipX = true;
    }
    if (direction === "right") {
      anteater.move(500, 0)
    } else {
      anteater.move(-500, 0)
    }
  })

  wait(1, () => {
    player.onCollide("anteater", () => {
      play("swish");
      wait(0.2, () => {
        go("lose");
      })
    })
  })

  wait(2, () => {
    loop(4, () => {
      if (player.pos.y <= 1000) {
        const web = add([
          sprite("web"),
          pos(player.pos.x, 250),
          area(),
          body({ isStatic: false }),
          "web"
        ])
        wait(1, () => {
          destroy(web)
        })
      }
    })
    loop(4, () => {
      const web1 = add([
        sprite("web"),
        pos(spider1.pos.x, 250),
        area(),
        body({ isStatic: false }),
        "web1"
      ])

      wait(1, () => {
        destroy(web1)
      })
    })
  })

  player.onCollide("web", () => {
    play("swish1")
    wait(0.2, () => {
      go("lose");
    })
  })

  player.onCollide("web1", () => {
    play("swish1")
    wait(0.2, () => {
      go("lose");
    })
  })

  player.onCollide("worm", (worm) => {
    play("score");
    destroy(worm);
    score++;
    scoreLabel.text = "Score: " + score;
    scoreLabel.pos = vec2(0, 0);
    if (score === 10) {
      wait(0.3, () => {
        go("bossLevelFinish");
      })
    }
  });

  let scoreLabel = add([
    text("Score: " + score, {
      size: 30,
    }),
    pos(0, 0),
    color(0, 0, 0)
  ]);

  //ant movement 
  onKeyDown("left", () => {
    player.move(-SPEED, 0)
  })
  onKeyDown("right", () => {
    player.move(SPEED, 0)
  })

  onKeyDown("a", () => {
    if (!(currentLeftTile === null) && player.isColliding(currentLeftTile)) {
      destroy(currentLeftTile)
      currentLeftTile = null
    }
  })

  onKeyDown("s", () => {
    if (!(currentBottomTile === null) && player.isColliding(currentBottomTile)) {
      destroy(currentBottomTile)
      currentBottomTile = null
    }
  })

  onKeyDown("d", () => {
    if (!(currentRightTile === null) && player.isColliding(currentRightTile)) {
      destroy(currentRightTile)
      currentRightTile = null
    }
  })

  player.onCollide("dirt", () => {
    onKeyPress("up", () => {
      if (player.pos.y > 300) {
        player.jump(600)
      }
    })
  })

  player.onCollide("dirt", (tile, col) => {
    if (col.isLeft()) {
      currentLeftTile = tile

    } else if (col.isRight()) {
      currentRightTile = tile

    } else {
      currentBottomTile = tile
    }

  })
});

go("start");