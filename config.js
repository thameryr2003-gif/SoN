/*
██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
Copyright (c) 2024 Wick Studio
*/

module.exports = {    
    token: "", // token
    clientId: "1461860525406294159", // bot id
    prefix: "!", // prefix
    language: "ar", // ar for arabic | en for english
    verbose: true,
    musicCardPath: "./musicard.png",
    enableLogging: true,
    djRoleName: "Wick",
    aliases: {
      play: ["ت", "start", "playmusic"],
      pause: ["hold", "stopmusic"],
      resume: ["r", "continue"],
      skip: ["s", "next", "jump"],
      stop: ["end", "terminate"],
      volumeUp: ["vup", "increasevolume"],
      volumeDown: ["vdown", "decreasevolume"],
      repeat: ["loop"],
      queue: ["q"],
      nowplaying: ["np"],
      clear: ["c"],
      remove: ["rm", "delete"]
  }
};
