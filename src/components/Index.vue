<template>
    <div id="index" :style="indexBGC">
        <div class="title" :style="titleBGC">
            <div class="title-div" :class="{'title-div-show':titleShow}">
                <span class="heart" @click="startAdv">准备好开始冒险了吗？</span>
            </div>
        </div>
        <div class="start" :style="startBGC">
            <ul>
                <li>
                    <el-button class="start-btn" type="danger" round @click="start">别BB，开始吧</el-button>
                </li>
                <li>
                    <el-button class="start-btn" type="success" round @click="giveUp()">好吧，我怂了</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                giveUpNum: 0,
                giveUPText: [
                    '勇于尝试，遇见更好的自己!',
                    '不要轻易放弃啊！！！',
                    'QAQ，你真的决定放弃么？'
                ],
                indexBGC: {
                    backgroundImage: 'url(' + require("@/assets/img/page-bg.jpg") + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                },
                titleBGC: {
                    backgroundImage: 'url(' + require("@/assets/img/classroom.png") + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                },
                startBGC: {
                    backgroundImage: 'url(' + require("@/assets/img/success-result-bg.png") + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center'
                },
                titleShow: false
            }
        },
        methods: {
            startAdv() {
                this.$notify({
                    title: '告诉你:',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>不是点这里，下面那么大两个按钮没看到么，真够瞎的啦！</strong>',
                    type: 'warning'
                });
            },
            giveUp() {
                if (this.giveUpNum > 2) {
                    this.$notify.error({
                        title: '告诉你:',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>算了，既然你决心要放弃，那，滚吧！</strong>',
                    });
                } else {
                    this.$notify({
                        title: '告诉你:',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>' + this.giveUPText[this.giveUpNum] + '</strong>',
                        type: 'success'
                    });
                }
                this.giveUpNum++
            },
            start() {
                this.$confirm('<strong>即将进入小游戏，在规定时间内留住更多美好的自己</strong>' +
                    '<hr></br>tips：你只有20s时间，要抓紧哦！', '确认信息', {
                    distinguishCancelAndClose: true,
                    dangerouslyUseHTMLString:true,
                    confirmButtonText: '确定前往',
                    cancelButtonText: '还是不了'
                })
                    .then(() => {
                        this.$router.push({
                            name:'Gopher'
                        })
                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '你居然放弃了！'
                                : '你点了右上角的×！'
                        })
                    });
            }
        },
        mounted() {
            setTimeout( ()=> {
                this.titleShow = true;
            }, 1000)
        }
    }
</script>

<style scoped>
    #index {
        position: relative;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
    }

    .title {
        position: relative;
        margin: 0 auto;
        height: 728px;
    }

    .start {
        margin: 0 auto;
        padding: 0 30px;
        height: 560px;
        box-sizing: border-box;
    }

    .start ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
    }

    .start ul li {
        flex-basis: 300px;
        height: 200px;
        margin: 160px 50px;
        flex-grow: 1;
    }

    .start-btn {
        width: 100%;
        height: 100%;
        font-size: 5rem;
        box-shadow: 0 0 5px #FFF;
        box-sizing: border-box;
    }

    .start-btn:active {
        box-shadow: 0 2px 0 #FFF;
    }

    .title-div {
        width: 1200px;
        text-align: center;
        margin: 0 auto;
        font-size: 7rem;
        padding-top: 240px;
        padding-bottom: 20px;
        box-sizing: border-box;
        opacity: 0;
        transition: all 2s;
    }

    .title-div-show {
        opacity: 1;
    }

    .heart {
        width: 50px;
        height: 50px;
        color: darkred;
        cursor: pointer;
        position: relative;
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px dotted silver;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        animation: heart 2s ease-out;
    }

    .heart:hover {
        color: red;
    }

    .heart:active {
        background-color: rgba(0, 0, 0, 0.5);
    }

    /*用transform就流畅了*/
    @keyframes heart {
        0% {
            left: 0;
            top: 200px;
        }
        100% {
            left: 0;
            top: 0;
        }
    }
</style>