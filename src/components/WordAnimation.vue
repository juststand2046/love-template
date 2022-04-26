<template>
  <div id="word-animation">
    <div class="topInfo">
      <div class="topInfo-div" :class="{ 'info-show': infoShow }">
        或许你早已经察觉了，毕竟每一次点击都是爱的形状。<br />
        那好吧，这表面上是小游戏，但实际却是一场真真切切的告白啊！
      </div>
    </div>
    <p class="landIn">
      <span
        v-show="item.flag"
        v-for="(item, index) in landInTextArr"
        :key="index"
        >{{ item.text }}</span
      >
    </p>
    <div
      style="
        position: absolute;
        width: 100vw;
        bottom: 130px;
        text-align: center;
      "
    >
      <transition name="el-fade-in-linear">
        <el-button
          v-show="nextTextShow"
          class="next-btn"
          type="info"
          round
          @click="nextText"
          >然后呢</el-button
        >
      </transition>
      <transition name="el-fade-in-linear">
        <el-button
          v-show="nextTextShow2"
          class="next-btn"
          type="info"
          round
          @click="nextText2"
          >再然后呢</el-button
        >
      </transition>
      <transition name="el-fade-in-linear">
        <el-button
          v-show="nextTextShow3"
          class="next-btn"
          type="info"
          round
          @click="nextText3"
          >再再然后呢
        </el-button>
      </transition>
      <transition name="el-fade-in-linear">
        <el-button
          v-show="nextTextShow4"
          class="next-btn"
          type="info"
          round
          @click="nextText4"
          >再再再然后呢
        </el-button>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordAnimation",
  data() {
    return {
      landInText:
        "我看过很多优秀的剧情片，《请回答1988》是其中出类拔萃的，他告诉我『逝者如斯，生者已矣』，\n" +
        "教会我『相互扶持，微笑面对生活』，最重要的是让我懂得了珍惜眼前人。\n" +
        "大部分人对《1988》评价很高，而在我看来，不仅如此，他更像是一位老朋友，他让我更加懂得『人生』。\n" +
        "现在，我如醍醐灌顶般清醒。现在，我不想再错过，不想多年后回想起然后捶胸顿足。\n" +
        "现在，我庆幸我找到了，我庆幸我明白了，原来，最好的一直都在我身边。",
      landInTextArr: [],
      infoShow: false,
      nextTextShow: false,
      nextTextShow2: false,
      nextTextShow3: false,
      nextTextShow4: false,
    };
  },
  methods: {
    showText() {
      let that = this;
      console.log(111);
      for (let i in that.landInTextArr) {
        ((i) => {
          setTimeout(() => {
            that.landInTextArr[i].flag = true;
          }, i * 300);
        })(i);
      }
      console.log(this.landInTextArr);
    },
    handleText() {
      let temp = {};
      let newArr = [];
      let arr = this.landInText.split("");
      for (let i in arr) {
        temp.flag = false;
        temp.text = arr[i];
        newArr.push(temp);
        temp = {};
      }
      this.landInTextArr = newArr;
      console.log(newArr);
      setTimeout(() => {
        this.showText();
        this.infoShow = true;
      }, 2000);
    },

    // 文案分段方法可以根据段落封装一下
    // 这里就手动分文字和计算时间了
    nextText() {
      this.landInText =
        "为什么突然会有这种感觉呢？早上起床刷牙，看着镜子中的自己，脑子里却全部都是你；上班了，面对密密麻麻\n" +
        "的代码，从字里行间却仿佛能看到你的模样；睡觉了，但是一闭上眼，你就像梦一般钻进我的脑海里。我没有睡着\n" +
        "却又不想睁眼，我怕我一睁眼你就消失不见。呃......我一定是出bug了，中了名为爱情的病毒。";
      this.handleText();
      this.nextTextShow = false;
      setTimeout(() => {
        this.nextTextShow2 = true;
      }, 4600);
    },
    nextText2() {
      this.landInText =
        "色彩是什么时候有的呢？是从小学的时候就开始了么，嗯，大概吧，记忆都已经模糊了。" +
        "努力回想才能够隐隐约约感觉到这份深藏的感情，庆幸的是没有把它遗失在时间里。话说回来那时都只是小学生，懂什么啊，" +
        "产生的所谓喜欢也大概率只是对朋友甚至对事物的那种，但是我却\n" +
        "知道种子已经深深种在了我的心里。";
      this.handleText();
      this.nextTextShow2 = false;
      setTimeout(() => {
        this.nextTextShow3 = true;
      }, 4400);
    },
    nextText3() {
      this.landInText =
        "十四、十五、还是十六年，已经记不清了，不过好在现在它已经破土而出开始茁壮成长了，那以后呢？它会：\n" +
        "A我们一起浇灌，让它枝繁叶茂 B煞笔吧，谁让你种了，拔了拔了 C不管它，没多久（十年？）就会枯萎了。那么，你会如何选择呢？";
      this.handleText();
      this.nextTextShow3 = false;
      setTimeout(() => {
        this.nextTextShow4 = true;
      }, 3600);
    },
    nextText4() {
      this.$confirm("没有再然后了，选择吧", "提示", {
        confirmButtonText: "我已经作出了选择",
        cancelButtonText: "我还没想好",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "warning",
            message: "先别着急，其实，我还有话要说",
          });
          this.$router.push({
            name: "ChosenBefore",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "没事，慢慢来，不着急",
          });
        });
    },
  },
  mounted() {
    this.handleText();
    setTimeout(() => {
      this.nextTextShow = true;
    }, 6300);
    //换音乐
    let music =
      '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 ' +
      'src="https://music.163.com/outchain/player?type=2&id=578090&auto=1&height=66"></iframe>';
    this.$store.commit("setCloudMusic", music);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

#word-animation {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.8),
      rgba(16, 16, 16, 0.8)
    ),
    url("https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg");
  background-size: cover;
}

p {
  margin: 0 9em;
  font-size: 2em;
  font-weight: 600;
}

.landIn {
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.8;
  color: white;
  font-family: Lora, serif;
  white-space: pre;
}

.landIn span {
  animation: landIn 0.8s ease-out both;
}

@keyframes landIn {
  from {
    opacity: 0;
    transform: translateY(-20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.topInfo {
  font-size: 1.5rem;
  width: 100vw;
  position: absolute;
  top: 100px;
}

.topInfo-div {
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  background: linear-gradient(
    rgba(231, 214, 198, 0.2),
    rgba(255, 255, 255, 0.5)
  );
  color: white;
  border-radius: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid pink;
  opacity: 0;
  transition: all 3s;
}

.info-show {
  animation: landIn 2s ease-out both;
}

.next-btn {
  transition: all 2s;
}

.next-btn:hover {
  background-color: #fff;
}
</style>