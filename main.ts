controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 . 
        2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 2 
        1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, MainShip, 100, 0)
})
function PowerUps () {
    list = [0, 1]
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let projectile2: Sprite = null
let EnemyShip: Sprite = null
let list: number[] = []
let projectile: Sprite = null
let MainShip: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111ffffffffffffffffffffffffffffffffff119ffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111ffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffff119ffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffff111fffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffff119fffffffffffff
    fffffffffffffffffffffffffffffffffffff119ffffffffffffffffffffffffffffffff99d99bbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffff
    fffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffff99ddbdd66162bcccccc9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffff999ddbbbd66222111ccccccb99fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9966ddbbbb6622211212ccccccbbc99fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdd69dddbbb66612221222212212cccccbe9fffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddd96dd6b6dbd62222222222222222cccccc99fffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffff
    ffffffffffffffffff55fffffffffffffffffffffffffffffffffffffdbbd9666666dbb662226222222cccccccccccccc9ffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffff
    fffffffffffffff5ffff5fffffffffffffffffffffffffffffffffffdbbb99666966d62266222222cccccccccccccccccc69ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff5fff5fffffffffffffffffffffffffffffffffdbbb999669666666222222222ccccbbbcc8bcccccccccc9ffffffffffffffffffffffffffffffffffffffffffffff111ffffffffff
    fffffffffffffffff5f445fffffffffffffffffffffffffffffffdbbb999666666666222222222cbbcbe2bbb2bcccccbbcccb9fffffffffffffffffffffffffffffffffffffffffffff119ffffffffff
    ffffffffffffffffff55244fffffffffffffffffffffffffffff9bbb999666666666622222222bccb222222bbbbb22222bcccccffffffffffffffffffffffffffffffffffffffffffff111ffffffffff
    ffffffffffffffffff4442ccfffffffffffffffffffffffffffdbbb999669666666266222262bbbbb2222222ccc222b22bbc2cccffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff2c2ccffffffffffffffffffffffffffdbbb9d99ddd666662262222622bbcb222222222bc222bcc2bc226c9fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff222cccfffffffffffffffffffffffffbbbbbbddd966666222622222222222222b22222222222cc2ccc226c9ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffccccccfffffffffffffffffffffffdbbbbbbdd6966666666262222222222bbdbbebb2222222222bcc2c26c9fffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffcccc1ccfffffffffffffffffffff9bbdbddd6666666666222622262222ddddddddde2222222222bccbbccccfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffcccccccfffffffffffffffffffffffffdd666666666662262222222bddddddbdbbddcccccd22b2ebccbbbbc9ffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffccccccccfffffffffffffffffffffffffff66666666662262222222bdddddbbbbbdbbbccccccb2bbbccc2bbb9fffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffccc1cccccfffffffffffffffffffffffffff6966666666662222bbbdddddbbbddbbbbbbbbbcccc2bcccbb2bbcfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffccccccccffffffffffffffffffffffffffffff6666662622222bbdddbbbbdbbbbbbbbbbbcccccc2bbccc22bc9ffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffcc1cc1c1cfffffffffffffffffffffffffffffff6662262262bbdddddbbbdbbbbbbbbbbbbcbccc22bcccc22c6ffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffccccccccfffffffffffffffeefffffffffffffff6d2262666bddbbbddbbdbbbbbbbbbbbbcccccc22bbccc2269fffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffcdccccccffffffffffffff99eeeeeeffffffffff6d6622662bddbbdbbbbbbbbbbbbbbbbbccccccc22bcccc266fffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffccc1cccffffffffffffff9ddeebebeffffffffff66622662bdddbbbbbbbbbbbbbbbbbbbccccccc222bbccc669ffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffcccccfffffffffffffff99999966edffffffffff6622262bddbbbdbbbbbbbbbbbbbbbbcccccccc222bbcc269ffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffccffffffffffffffff99999996dedffffffffff2222262ddbddbbbbbbbbbbbbbbbbbbccccccccc222222266ffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff999999969eefffffffff42622222bbbbbbbbbbbbbbbbbbbbbbbbccbccccc2222222269fffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff99999966ddefffffffff42222222bbbbbbbbbbbbbbbbbbbbbbbcbccccccccc22222269fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff999bb99666defffffffff442226222bbbbbbbbbbbbbbbbbbbbbbcccccccccccc2222229fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99bbbb96669eefffffffff44226222bbbbbbbbbbbbbbbbbbbbbbcbccccccccccc222226ffffffffffff119ffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99bbdbb66696effffffffff42262222bbbbbbbbbbbbbbbbbbbbccbccccccccccc2222269fffffffffff111fffffffffffff111ffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99dbbbbb6696effffffffff4226262222bbbbeb222bbbbbbbbbcccccccccccccc2222269fffffffffff111fffffffffffff119ffffffffffffffff
    ffffffff119fffffffffffffffffffffffffffffff99bbbbbbe696eefffffffff42222222222222222222bbbbbbbbccccccccccccc22222269fffffffffffffffffffffffffff111ffffffffffffffff
    ffffffff111fffffffffffffffffffffffffffffff9bbbbbccbc669efffffffff5222622222222222d222ebbbbbbbcccccccccccbb22222269fffffffffffffff5ffffffffffffffffffffffffffffff
    ffffffff111fffffffffffffffffffffffffffffff9bbbbbbbbcc69efffffffff42226222222dd22dbbd22bbbbbbbccccccccccceb22222269fffffffffffffff5ffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9bbbbbbbbccc9efffffffff4222222222ddddbbbbd22cbbbbbbbbccccccccc2222222269ffffffffffffffff5fffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9ebbbbcccccccefffffffff4222222222222ddbbbb222bbbbbbbbccccccccc2222222269fffffffffffffffff5ffffffffffffffffffffffffffff
    ffffffffffffffffffff5fffffffffffffffffffff9bbbbbcccccccefffffffff5266222222222dddddbdd22bbbbbbccccccccc22222222bb9ffffffffffff55ffff5fffffffffffffffffffffffffff
    fffffffffffffffffffff5ffffffffffffffffffffbbbbbbcccccceefffffffff422222222222222d2222222bbbbbbccccccccc22222222bb9fffffffffffff555fff5ffffffffffffffffffffffffff
    fffffffffffffffffffff5ffffffffffffffffffff9dbbbbccbbcceffffffffff462222222222222222222222bbbbbccccccccc222222222b9ffffffffffffffff5f44ccffffffffffffffffffffffff
    fffffffffffffffffffff5ffffffffffffffffffff9dbbbbbbbbccefffffffff442222222222222222222222bbbbccccccccccc22222222269fffffffffffffffff522ccccffffffffffffffffffffff
    ffffffffffffffffffffff5fffffffffffffffffff9bbbbbbbccccefffffffff422222222222222222222222bbbbcccccccccc222222222269fffffffffff5555ff42cccccffffffffffffffffffffff
    ffffffffffffffffffffff5fffffffffffffffffff9bbbbbbbccccefffffffff622222222222222222222222bbbbcccccccccc22222222226ffffffffffffffff5f2cccccccfffffffffffffffffffff
    ffffffffffffffffff5ffff5ffffffffffffffffff99bbbbbbbbceffffffffff222222222222222222222222bbbbcbcccccccc22222222226ffffffffffffffffff2cccccccfffffffffffffffffffff
    ffffffffffffff5ffff5fff5fffffffffffffffffff99dbbbcbbceffffffffff222222222222222222222222bbbbbccccccccc222cc222269fffffffffffffffffccccc1ccccffffffffffffffffffff
    fffffffffffffff5ffff5ff5fffffffffffffffffff99dbbbccceeffffffffff622622222222222222222222bbbbccccccccc2222cc222269fffffffffffffffffccccccccccffffffffffffffffffff
    ffffffffffffffff5fff5444442cfffffffffffffff999bbbbbcefffffffffff622622222222222222222222bbbbcccccccc22222dd22226ffffffffffffffffffccccccccccffffffffffffffffffff
    fffffffffffffffff5ff5444422ccffffffffffffff969bbbbbbefffffffffff662622262222222222222222bbbbccccccc22222bd222226ffffffffffffffffffccc1cc1cccffffffffffffffffffff
    ffffffffffffffffff5ff54222cccccfffffffffffff99bbbbcceffffffffff2222222262222222222222222bbbcccccccc2222bbd222269fffffffffffffffffcccccccccccffffffffffffffffffff
    ffffffffffffffffff55f4422ccccccfffffffffffff9999bbbeeffffffffff2222222222222222222222222ccbcccccccc2222bc222226ffffffffffffffffffccccccc1cccffffffffffffffffffff
    ffffffffffffffffffff5442ccccccccfffffffffffff699bbbefffffffffbbb2222222222222222222222222bbbbccccc22222bcc22269ffffffffffffffffffccc1ccccccfffffffffffffffffffff
    fffffffffffffffffffff422ccc1cccccffffffffffff9999bbefffffffffdbbdd22222222622222222222222bbcccccc22222222222669ffffffffffffffffffccccccccccfffffffffffffffffffff
    fffffffffffffffffffff22ccccccc1cccfffffffffff9699dbefffffffff66bb6d2222222622222222222222bbcccccc2222222222269fffffffffffffffffffccccccccccfffffffffffffffffffff
    fffffffffffffffffffff22cccccccccccffffffffffff9696befffffffff66dbbd6226262222222222222222bbcbccc2222222222d669fffffffffffffffffffffdccccccffffffffffffffffffffff
    ffffffffffffffffffffffcccc1ccccc1cfffffffffffff999ebffffffff66666dbb2262222622222222222222bbbccc2222222229b69ffffffffffffffffffffffffcccffffffffffffffffffffffff
    ffffffffffffffffffffffccccccc1ccccffffffffffffffffffffffffff666666bbb262222222222222222222bbbc222222222222b6fffffffffffffffffffffffffffcffffffffffffffffffffffff
    fffffff111ffffffffffffccc1ccccccccfffffffffffffffffffffffff66666666bb2622666222222222222222b2222222222222699ffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffff119ffffffffffffcccccccccc1cfffffffffffffffffffffffff66666666dbb6222662222222222222222222222222222269fffffffffffffff119fffffffffffffffffffffffffffffffffff
    fffffff111fffffffffffffcccccccccccffffffffffffffffffffffff6666666666dbb22266222222222222222222222222222269ffffffffffffffff111fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffccccccccccfffffffffffffffffffffff696666666666dd2222662222222222222222222222222266fffffffffffffffff111fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffcccc1ccccffffffffffffffffffffffc9669666966d66dd2222262222222222222222222bb2222669fffffffffffffffffffffffffffffffffffffff111fffffffffffff
    fffffffffffffffffffffffffcccccffffffffffffffffffffffffccc66699669dddd222262222222222222222222222be222669ffffffffffffffffffffffffffffffffffffffff119fffffffffffff
    fffffffffffffffffffffffffffcfffffffffffffffffffffffff96c66669966666dd22226666662222222222222222dd222669fffffffffffffffffffffffffffffffffffffffff111fffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff96966669966ddd626226262222222222222222222d222669ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffff969666696666666622626222222222222222222222669ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffff9966966966666666226222222222222226222222669fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9699996666666222222222222222222112222699ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff969996666662222221122222222221222669ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff996999666622221212222222221226669ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9961161126612211122226116699ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffff99161111611112111666699fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffff9999661166669999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffff999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffff119fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffff
    fffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffff
    fffffffffffffffffffffffffffffffff119ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff119fffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff119fffffffff
    ffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffffffffffffffffffffff111fffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffff119ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff119fffffffffffffff111fffffffffffffffffffffffffffff111ffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffff119ffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff119ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
MainShip = sprites.create(assets.image`Civilianship`, SpriteKind.Player)
controller.moveSprite(MainShip, 100, 100)
MainShip.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(img`
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        .............e..................
        ............e8b.................
        ..........be88..................
        .........b8888b.................
        .......bb88888..................
        .....bbf888888b.................
        ....b8f8f888f8.....8............
        ....8888eee88fb..888224555......
        .f11888ee1eef8bbb88824445555....
        .f88888e1e1e888888882245555.....
        ....88fee1ee8888888824445555....
        ....bf88eee888bbb8882245555.....
        .....bf888f8f8b..88824445555....
        .......bb88f88.....8............
        .........b8888b.................
        ..........be88..................
        ............e8b.................
        .............e..................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = -20
    EnemyShip.y = randint(10, scene.screenHeight() - 10)
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . f f f f f f 8 8 8 8 8 8 8 8 8 
        f 8 8 8 8 8 8 f f f f f f f f f 
        . f f f f f f 8 8 8 8 8 8 8 8 8 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, EnemyShip, 50, 50)
})
