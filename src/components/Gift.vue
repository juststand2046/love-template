<template>
  <div style="width: 100vm">
    <div id="gift">
      <div
        class="check-div"
        v-for="(item, index) in gift"
        :key="index"
        :class="{ 'gift-checked': item.checked }"
        @click="chooseGifts(item)"
      >
        <el-image class="gift-img" :src="item.imgSrc" fit="contain"></el-image>
        <div class="gift-info">
          <a :href="item.href" target="_blank" @click="goJd($event)">{{
            item.title
          }}</a>
        </div>
        <transition name="el-fade-in-linear">
          <el-image
            v-show="item.checked"
            src="data:image/png;base64,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"
            fit="contain"
            class="checked-img"
          >
          </el-image>
        </transition>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="choose-btn">
      <el-button class="choose-btn-button" type="success" @click="onSubmit"
        >我选好啦</el-button
      >
      <el-button class="choose-btn-button" type="info" @click="lookOther"
        >还想再看看别的呢</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Gift",
  data() {
    return {
      chosenGifts: [],
      gift: [
        {
          value: "小米电动牙刷",
          imgSrc:
            "http://img10.360buyimg.com/n1/jfs/t1/73021/5/12435/28043/5d9c54cfE9f81a286/a2f4b1126473c706.jpg",
          title:
            "米家 小米电动牙刷 声波震动 进口纤密软毛 30天超长续航 IPX7防水 T100 蓝色",
          href: "https://item.jd.com/100005070715.html",
          checked: false,
        },
        {
          value: "小适（showsee)电吹风",
          imgSrc:
            "http://img12.360buyimg.com/n1/jfs/t1/117668/25/1576/50687/5e994ddbEe2329d12/38727d57c4dcd8db.jpg",
          title:
            "小米有品小适（showsee)电吹风机家用 便携 大功率负离子吹风筒 大风量速干 恒温护发冷热风 A1-W",
          href: "https://item.jd.com/100009327632.html",
          checked: false,
        },
        {
          value: "竹炭记忆棉靠垫",
          imgSrc:
            "http://img11.360buyimg.com/n1/jfs/t1/86651/26/10448/235831/5e183079E3e416b55/f1202b62dfd978da.jpg",
          title:
            "FOOJO 慢回弹腰靠 天鹅绒竹炭记忆棉靠垫 办公室学生腰枕腰垫汽车腰靠靠背垫子 灰色竹炭款",
          href: "https://item.jd.com/100010603266.html",
          checked: false,
        },
        {
          value: "毛球修剪器",
          imgSrc:
            "http://img10.360buyimg.com/n1/s450x450_jfs/t1/85350/5/3354/370506/5ddf7b4fEb0e2401a/fcb6d783696ee334.jpg",
          title: "米家毛球修剪器 高效清洁去毛球 快速充电 持久续航",
          href: "https://item.jd.com/100010341910.html",
          checked: false,
        },
        {
          value: "小米手环4",
          imgSrc:
            "http://img10.360buyimg.com/n1/s450x450_jfs/t1/68001/6/6644/69967/5d4c2a8fE5f5ad0d2/dda460c870d4eb0e.jpg",
          title:
            "小米手环4 酒红色 AI彩屏心率运动手环游泳姿势识别50米防水6轴传感器24小时高精准心率监测",
          href: "https://item.jd.com/100003687195.html",
          checked: false,
        },
        {
          value: "小米简约休闲双肩包",
          imgSrc:
            "http://img14.360buyimg.com/n1/jfs/t1/80796/31/7911/53433/5d5fe5abEa90c588c/a4109258f91b5b79.jpg",
          title: "小米简约休闲双肩包 创新防水侧袋|20L大容量|冰感面料 黄色",
          href: "https://item.jd.com/100004239679.html",
          checked: false,
        },
        {
          value: "电子画板",
          imgSrc:
            "http://img11.360buyimg.com/n1/s450x450_jfs/t1/42892/35/15384/71407/5d831902Ed5a98870/7df8f602ab956fdf.jpg",
          title:
            "小米液晶小黑板 13.5英寸 儿童画板 写字演算手写绘画涂鸦 电子画板",
          href: "https://item.jd.com/100004879541.html",
          checked: false,
        },
        {
          value: "成长读物",
          imgSrc:
            "http://img14.360buyimg.com/n1/jfs/t1/1383/6/4198/73263/5b9b8428E50f4bff1/951abe51bb8eb9ca.jpg",
          title: "《软刺》+《房思琪的初恋乐园》",
          href: "https://item.jd.com/33027249859.html",
          checked: false,
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.chosenGifts);
      if (this.chosenGifts.length < 3) {
        this.$message.error(
          "可以选择其中三个哦，如果都不满意，点击右边按钮去看看别的吧。"
        );
      } else {
        let params = {
          client_id: "client",
          client_secret: "secret",
          grant_type: "password",
          password: "123456",
          scope: "all",
          username: "admin",
        };
        this.$http
          .post("http://192.168.200.3:3000/oauth/token", params)
          .then((data) => {
            console.log(data.body.data.access_token);
            this.$http
              .post(
                "http://192.168.200.3:3000/api/v1/Advice",
                {
                  content:
                    this.chosenGifts[0].value +
                    "|" +
                    this.chosenGifts[1].value +
                    "|" +
                    this.chosenGifts[2].value,
                },
                {
                  headers: {
                    Authorization: "Bearer " + data.body.data.access_token,
                  },
                }
              )
              .then((data2) => {
                console.log(data2);
                if (data2.body.status === "0") {
                  this.$message({
                    type: "success",
                    message:
                      "你的心愿礼物我已经收到了，请耐心等待礼物到来吧！╰(*°▽°*)╯",
                    duration: 0,
                    showClose: true,
                  });
                  this.$router.push({
                    name: "CatAnimation",
                  });
                } else {
                  this.$message.error({
                    message: "啊哦，可能是网络出问题了QAQ",
                    duration: 0,
                    showClose: true,
                  });
                }
              });
          });
        this.$http
          .get("http://192.168.200.3:3000/api/v1/Advice")
          .then((res) => {
            console.log(res);
          });
      }
    },
    chooseGifts(item) {
      item.checked = !item.checked;
      this.chosenGifts = this.gift.filter((item) => {
        if (item.checked) {
          return item;
        }
      });
      if (this.chosenGifts.length > 3) {
        item.checked = !item.checked;
        console.log("大于3了");
        this.$message({
          type: "warning",
          message: "最多只能选择其中三个哦！做人可不能太贪心了(●'◡'●)",
        });
        this.chosenGifts = this.gift.filter((item) => {
          if (item.checked) {
            return item;
          }
        });
      }
      console.log(this.chosenGifts);
    },
    goJd(ev) {
      ev.stopPropagation();
    },
    lookOther() {
      this.$confirm("这些都不是我喜欢的，我要去逛逛别的", "要点别的？", {
        confirmButtonText: "嗯嗯，我要去看看别的",
        cancelButtonText: "点错了",
        type: "warning",
      })
        .then(() => {
          this.$router.push({
            name: "CatAnimation",
          });
          this.$message({
            type: "success",
            dangerouslyUseHTMLString: true,
            message:
              "你可以慢慢选啊，选好了别忘记告诉我哦！<br><br>&nbsp;&nbsp;&nbsp;*.。(๑･∀･๑)*.。",
            duration: 0,
            showClose: true,
          });
          window.open("https://www.jd.com/", "_blank");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "我点错了",
          });
        });
    },
    toCatAnimation() {
      console.log("11111111");
      this.$router.push({
        name: "CatAnimation",
      });
    },
  },
};
</script>

<style scoped>
#gift {
  position: relative;
  max-width: 1000px;
  margin: 50px auto;
  text-align: center;
  border-radius: 15px;
  border: 1px dotted silver;
  background-color: rgb(242, 242, 242);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 20px 50px;
  display: flex;
  flex-wrap: wrap;
}

.check-div {
  position: relative;
  flex-basis: 900px;
  border-radius: 15px;
  margin: 10px 0;
  height: 200px;
  flex-grow: 1;
  background-image: linear-gradient(
    to right,
    rgba(72, 198, 239, 0.5),
    rgba(111, 134, 214, 0.5)
  );
  transition: all 1s;
  box-sizing: border-box;
  filter: saturate(0%);
}

.gift-img {
  position: relative;
  float: left;
  width: 150px;
  height: 150px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 50px;
}

.gift-info {
  position: relative;
  float: left;
  width: 600px;
  height: 150px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  margin-left: 50px;
}

.gift-info a {
  font-size: 1.5rem;
  text-align: left;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid gainsboro;
}

.gift-checked {
  border: 3px solid greenyellow;
  filter: saturate(100%);
}

.checked-img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.choose-btn {
  width: 100%;
  text-align: center;
  padding: 10px;
  margin: 20px 0;
  box-sizing: border-box;
}

.choose-btn-button {
  font-size: 2rem;
  width: 300px;
  height: 100px;
  margin: 0 100px;
}
</style>