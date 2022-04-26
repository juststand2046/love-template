<template>
  <div id="scratch-card" v-show="gameShow">
    <img src="@/assets/img/4.png" width="662" height="750" alt="" />
    <canvas id="canvas" width="662" height="750">
      浏览器太low了，连canvas都不支持！
    </canvas>
    <div class="card-title">
      <input :value="'时间还剩' + timer + '秒啦！'" type="text" />
      <p>你已经刮开了{{ picPercent }}%</p>
      <el-button type="danger" round icon="el-icon-time" @click="timePause"
        >时间停止</el-button
      >
      <el-button type="warning" round icon="el-icon-time" @click="timeFlow"
        >时间流动</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ScratchCard",
  data() {
    return {
      timer: 10,
      picPercent: 0,
      timePauseFlag: false,
      firstTimePause: true,
      gameShow: true,
    };
  },
  methods: {
    timerDecrease() {
      let sTime = 0;
      let ms = setInterval(() => {
        sTime++;
        if (this.timer === 0 || this.timePauseFlag) {
          window.clearInterval(ms);
        }
        if (sTime === 5) {
          this.timer--;
          sTime = 0;
        }
      }, 200);
    },
    // 计算已经刮过的区域占整个区域的百分比
    getFilledPercentage(ctx, canvas) {
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // imgData.data是个数组，存储着指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
      let pixels = imgData.data;
      let transPixels = [];
      for (let i = 0; i < pixels.length; i += 4) {
        // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
        // 为了提高计算效率，这儿设置当a值小于128，也就是半透明状态时就可以了
        if (pixels[i + 3] < 128) {
          transPixels.push(pixels[i + 3]);
        }
      }
      return (
        ((transPixels.length / (pixels.length / 4)) * 100).toFixed(2) + "%"
      );
    },
    // 设置阈值，去除灰色涂层
    handleFilledPercentage(percentage, ctx, canvas) {
      percentage = percentage || 0;
      this.picPercent = parseInt(percentage);
      if (parseInt(percentage) === 50) {
        //暂停时间
        this.timePauseFlag = true;
        // 当像素点的个数超过  50% 时，清空画布，显示底图
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
          this.$confirm(
            "其实你只需要完成一半，其它的交给我吧！",
            "哇哦，完成了",
            {
              confirmButtonText: "嗯嗯，下一个游戏是啥呀",
              cancelButtonText: "啥？我要再玩一次",
              type: "warning",
            }
          )
            .then(() => {
              console.log(11111);
              this.$alert(
                "即将进入下一个游戏，规定时间内找出<strong>数字9</strong>，记住它们的数量（有用么，也说不定）",
                "next",
                {
                  confirmButtonText: "去",
                  dangerouslyUseHTMLString: true,
                  callback: () => {
                    this.$router.push({
                      name: "FindNumberNine",
                    });
                  },
                }
              );
            })
            .catch(() => {
              //重新开始
              window.location.reload();
            });
        }, 1500);
      }
    },
    timePause() {
      this.timePauseFlag = true;
      if (this.firstTimePause) {
        this.$alert(
          "<strong>这里是游戏，连暂停时间都如此简单呢，可又有谁能把人生过作游戏呢？</strong>",
          "时停",
          {
            confirmButtonText: "我悟了",
            dangerouslyUseHTMLString: true,
            callback: () => {
              this.$message({
                type: "info",
                message: `你真的悟了么？`,
              });
            },
          }
        );
        this.firstTimePause = false;
      }
      this.$message({
        type: "success",
        message: "你成功暂停了时间！",
      });
    },
    timeFlow() {
      if (!this.timePauseFlag) {
        this.$message.error({
          message: "时间并没有暂停哦！",
        });
        return false;
      }
      this.timePauseFlag = false;
      this.timerDecrease();
      this.$message({
        type: "success",
        message: "时间开始流动了！",
      });
    },
    init() {
      let canvas = document.getElementById("canvas");

      if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        console.log(ctx);
        console.log(this.timer);
        //用灰色盖住图片
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 30;
        ctx.lineCap = "round";

        canvas.onmousedown = (e) => {
          let ev = e || window.event;
          // let x = ev.clientX - 135;
          // let y = ev.clientY - 35;
          let x = ev.offsetX;
          let y = ev.offsetY;
          console.log(x, y);
          ctx.moveTo(x, y);

          canvas.onmousemove = (e) => {
            let ev = e || window.event;
            let x = ev.offsetX + ctx.lineWidth / 2;
            let y = ev.offsetY + ctx.lineWidth / 2;

            ctx.lineTo(x, y);
            ctx.stroke();

            this.handleFilledPercentage(
              this.getFilledPercentage(ctx, canvas),
              ctx,
              canvas
            );
          };
          canvas.onmouseup = function () {
            canvas.onmousemove = "";
          };
        };
      }
    },
  },
  mounted() {
    this.init();
    this.timerDecrease();
  },
  watch: {
    timer: function (val, old) {
      console.log("val:%s,old:%s", val, old);
      if (val === 0 && this.picPercent < 50) {
        console.log("time-end");
        this.$confirm("时间已经到了，你想：", "timeout", {
          confirmButtonText: "刚刚手滑了，再来",
          cancelButtonText: "玩下一个游戏",
          type: "warning",
        })
          .then(() => {
            //重新开始
            window.location.reload();
          })
          .catch((action) => {
            console.log(action);
            this.$alert(
              "即将进入下一个游戏，规定时间内找出<strong>数字9</strong>，记住它们的数量（有用么，也说不定）",
              "next",
              {
                confirmButtonText: "去",
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.$router.push({
                    name: "FindNumberNine",
                  });
                },
              }
            );
          });
      }
    },
  },
};
</script>

<style scoped>
#scratch-card {
  position: relative;
}

#scratch-card img {
  position: absolute;
  left: 150px;
  top: 50px;
  border-radius: 15px;
}

#canvas {
  position: absolute;
  left: 150px;
  top: 50px;
  border-radius: 15px;
  box-shadow: 0 0 10px #fff;
  cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABuUlEQVRYR82XPy8EURTFf6fWUlD5k9ALhYLQkkgUJAql6HwFfAQqG6VCQiGR0BIKCaK3ibUVBSX1lSfzZGd3ZmdnZ2Z3XzLF5N177pm59913rkixzGweWAFmgIHgcQifwXMPnEu6aRVWSYZmNghsAevAeJJ9sF8GToCSpI9mPk0JmNkusAkMtRi43uwdOJLkcCJXLAEzuwVm2wxc73YnaS4KK5KAmbmc9ucU3MN8SXJ1E1oNBMzsDRjOObiHq0oaqcUOETCzU2C1oOAe9kzSmn/5JxAU3E7BwT38ni/MPwLBUXvKUO1pebvTMeWOqCfgjkmnvj70FzyBV2A07WdktK9IGpOZLQKXGcHadV9yBA6DVtsuSBa/kiPwAExnQcng++gIFNl4krhVHYFvoC/JsqD9n54g0PUUdL0I94HtgnKcBHvgasDpvOsky4L2F3wrfkmh9/LiUpY00TOXkVO+3buOA03QySs5LEh8UnNWwnG1ElLIUaK0CEXsyTQo4zhZXkR3bFDEjlWzwSRPhRxSwrGyvD5pXR3NagrTD6cbKXRjBTjOPJxG/BGnH5eByZjx/Bm4kHTVarv8BfUiqvAfUSxCAAAAAElFTkSuQmCC"),
    auto;
}

.card-title {
  width: 500px;
  position: relative;
  left: 1000px;
  top: 200px;
  font-size: 36px;
  color: white;
  padding: 30px 40px;
  border-radius: 15px;
  background-color: pink;
  border: 1px dotted silver;
}
.card-title input {
  border-radius: 10px;
  border: 1px dotted silver;
  padding-left: 15px;
  box-sizing: border-box;
}
</style>