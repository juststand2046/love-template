<template>
    <div class="chosen-before" :class="{'saturate':saturate}" :style="bgImg">
        <div class="last-word">
            <div class="word" v-show="item.show" v-for="(item,index) in myWord" :key="index">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChosenBefore",
        data() {
            return {
                saturate:false,
                bgImg: {background: 'url(' + require('@/assets/img/5.png') + ') no-repeat fixed center'},
                myWord:[
                    {text:'你知道吗？',show:false},
                    {text:'又有谁的内心深处不是孤寂而灰暗呢？',show:false},
                    {text:'我也一样。',show:false},
                    {text:'我本可以忍受黑暗，如果未曾见过光明。',show:false},
                    {text:'但是偏偏你闯进我心房，给我温暖和阳光，',show:false},
                    {text:'让我怦然心动，使我意乱情迷。',show:false},
                    {text:'正因为有了你，',show:false},
                    {text:'我的世界便有了色彩。',show:false},
                ]
            }
        },
        mounted() {
            setTimeout(()=>{
                for (let i in this.myWord){
                    (i => {
                        setTimeout(() => {
                            this.myWord[i].show=true;
                        }, (i) * 2500);
                    })(i)
                }
            },1000);
            setTimeout(()=>{
                this.saturate=true;
                setTimeout(()=>{
                    this.$confirm('我说完了，不过先别忙着作出选择啊，先让我祝你生日快乐吧', '\\(^o^)/', {
                        confirmButtonText: '好啊',
                        cancelButtonText: '嗯嗯',
                        type: 'warning'
                    }).then(() => {
                       this.$router.push({
                           name:'Birthday'
                       })
                    }).catch(() => {
                        this.$router.push({
                            name:'Birthday'
                        })
                    });

                },6000)
            },17000)
        }
    }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

    .chosen-before {
        width: 100%;
        height: 100%;
        filter: saturate(0%);
        transition: all 5s;
    }
    .saturate{
        filter: saturate(100%);
    }
    .last-word {
        max-width: 900px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 1px solid greenyellow;
        background-image: linear-gradient(to right, rgba(221,214,243,0.8), rgba(250,172,168,0.8));
        border-radius: 15px;
        text-align: center;
        padding: 50px;
    }

    .word {
        font-family: Lora, serif;
        font-size: 1.5rem;
        flex-basis: 700px;
        flex-grow: 1;
        margin: 20px 0;
        animation: myword 1s ease-out both;
    }
    @keyframes myword {
        from {
            opacity: 0;
            transform: translateX(-20%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>