<template>
  <div v-if="gameShow" id="game">
    <div id="field">
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
      <div><input @click="counts++" type="checkbox" /></div>
    </div>
    <h2 id="points" ref="points"></h2>
  </div>
</template>

<script>
export default {
  name: "Gopher",
  data() {
    return {
      counts: 0,
      gameShow: true,
      timer: 20,
    };
  },
  methods: {
    countsNum() {
      if (this.counts < 16) {
        console.log(this.counts);
        this.$confirm(
          `你抓住了${this.counts}个美好的自己！然后你想：`,
          "提示",
          {
            confirmButtonText: "还是玩下个游戏",
            cancelButtonText: "不完美，再来一次",
            type: "warning",
          }
        )
          .then(() => {
            this.$alert(
              "<strong>即将进入下一个小游戏，在规定时间内拂去阴霾展现自己！</strong>" +
                "<hr></br>tips：你只有10s时间（大概），要抓紧哦！",
              "提示信息",
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.$router.push({
                    name: "ScratchCard",
                  });
                },
              }
            );
          })
          .catch(() => {
            this.$alert(
              "<strong>人生大部分时候机会只有一次，错过了便是过错，不过这里是游戏啊，" +
                "再来一次么？</strong>",
              "信息",
              {
                confirmButtonText: "玩！",
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.counts = 0;
                  this.$message({
                    type: "info",
                    message: "再来一次，加油！",
                  });
                  //重新开始
                  this.gameShow = false;
                  this.$nextTick(() => {
                    this.gameShow = true;
                  });
                  setTimeout(() => {
                    if (this.timer === 0) {
                      this.countsNum();
                    }
                  }, 20000);
                },
              }
            );
          });
      } else {
        console.log(this.counts);
        this.$alert(
          "<strong>非常amazing啊，你居然拿到了满分！</strong><hr><br>你抓住了所有美好的自己，" +
            "但，那又有什么用呢？都是过往了，缅怀一下继续向前吧！",
          "哇哦",
          {
            confirmButtonText: "确定",
            dangerouslyUseHTMLString: true,
            callback: () => {
              this.$alert(
                "<strong>即将进入下一个小游戏，在规定时间内拂去阴霾展现自己！</strong>" +
                  "<hr></br>tips：你只有10s时间，要抓紧哦！",
                "提示信息",
                {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  callback: () => {
                    this.$router.push({
                      name: "ScratchCard",
                    });
                  },
                }
              );
            },
          }
        );
      }
    },
  },
  mounted() {
    let timeout = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(timeout);
        this.countsNum();
      }
    }, 1000);
  },
  watch: {
    counts: function (val, oldVal) {
      console.log("new: %s, old: %s", val, oldVal);
    },
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  background-color: #eee;
  width: 100%;
  height: 100%;
  margin: 0px;
  counter-reset: points;
  font-family: Arial;
  display: flex;
  flex-direction: column-reverse;
  --gameLength: 20s;
}

#points {
  text-align: center;
  width: 100%;
  color: #575757;
  position: relative;
  margin: 0px;
  padding: 10px 0px;
}

@keyframes timer {
  0% {
    transform: scaleX(1);
  }
  98%,
  100% {
    transform: scaleX(0);
  }
}

#points:after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: #4caf50;
  opacity: 0.4;
  transform-origin: left;
  animation: timer var(--gameLength) linear;
  animation-fill-mode: forwards;
}

#points::before {
  content: "分数: " counter(points);
}

#game {
  position: relative;
  width: 100%;
  height: 100%;
}

#field {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 80vw;
  height: 80vw;
  max-width: 80vh;
  max-height: 80vh;
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  background: #4caf50;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

@keyframes gameEndBackground {
  0%,
  98% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.7;
  }
}

#field:before {
  content: "";
  font-size: 30px;
  text-align: center;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 2;
  animation: gameEndBackground var(--gameLength) linear;
  animation-fill-mode: forwards;
}

@keyframes gameEndFont {
  0%,
  98% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#field:after {
  content: "你留住了 " counter(points) " 个美好的自己";
  font-size: 30px;
  font-weight: bold;
  color: #575757;
  text-align: center;
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  right: -50%;
  transform: translate(-50%, -60%);
  animation: gameEndFont var(--gameLength) linear;
  animation-fill-mode: forwards;
  z-index: 3;
}

#field > div {
  border: solid gray 10px;
  border-radius: 50%;
  overflow: hidden;
}

#field > div {
  border: solid #4e342e 10px;
  background: #ad5200;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

@keyframes rise {
  0%,
  30%,
  100% {
    transform: translateY(100%);
  }
  15% {
    transform: translateY(0%);
  }
}

#field > div > input {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  transform: translateY(100%);
  -webkit-appearance: none;
  background-position: center;
  background-size: contain;
}

#field > div:nth-of-type(1) > input {
  animation: rise 5s ease 3.2s infinite;
}

#field > div:nth-of-type(2) > input {
  animation: rise 5s ease 3.8s infinite;
}

#field > div:nth-of-type(3) > input {
  animation: rise 8s ease 7s infinite;
}

#field > div:nth-of-type(4) > input {
  animation: rise 7s ease 9.4s infinite;
}

#field > div:nth-of-type(5) > input {
  animation: rise 6s ease 6.4s infinite;
}

#field > div:nth-of-type(6) > input {
  animation: rise 5s ease 8.8s infinite;
}

#field > div:nth-of-type(7) > input {
  animation: rise 6s ease 3.6s infinite;
}

#field > div:nth-of-type(8) > input {
  animation: rise 5s ease 6.2s infinite;
}

#field > div:nth-of-type(9) > input {
  animation: rise 7s ease 5.4s infinite;
}

#field > div:nth-of-type(10) > input {
  animation: rise 8s ease 3s infinite;
}

#field > div:nth-of-type(11) > input {
  animation: rise 7s ease 1.6s infinite;
}

#field > div:nth-of-type(12) > input {
  animation: rise 7s ease 3.6s infinite;
}

#field > div:nth-of-type(13) > input {
  animation: rise 5s ease 1s infinite;
}

#field > div:nth-of-type(14) > input {
  animation: rise 5s ease 1.8s infinite;
}

#field > div:nth-of-type(15) > input {
  animation: rise 6s ease 8s infinite;
}

#field > div:nth-of-type(16) > input {
  animation: rise 8s ease 5.2s infinite;
}

#field > div input:checked {
  pointer-events: none;
  animation-play-state: paused;
  counter-increment: points;
  filter: saturate(120%);
}

#field > div input:focus {
  outline: none;
}
#field > div input:hover {
  cursor: pointer;
}

@keyframes gameEndMole {
  0%,
  98% {
    background: none;
  }
  100% {
    background: #ad5200;
  }
}

#field > div input:not(:checked):before {
  animation: gameEndMole var(--gameLength) linear;
  animation-fill-mode: forwards;
}

#field > div input:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

@media only screen and (max-height: 500px) {
  #field > div {
    border: solid #4e342e 5px;
  }
}

@media only screen and (max-width: 500px) {
  #field > div {
    border: solid #4e342e 5px;
  }
}

#field > div > input {
  background-image: url("../assets/img/4.png");
}
</style>