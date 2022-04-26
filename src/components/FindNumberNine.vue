<template>
    <div>
        <div class="fnn-title">
            <h1> 看看你能不能数出下面有多少个‘9’呢？</h1>
        </div>
        <div class="number">
            <div>9996669999996669999996669996666999666699999966669996666999</div>
            <div>9996699999999699999999669996666999666999669996669996666999</div>
            <div>9996669999999999999996669996666999669996666999669996666999</div>
            <div>9996666999999999999966666699999966669996666999669996666999</div>
            <div>9996666669999999996666666666996666669996666999669996666999</div>
            <div>9996666666699999666666666666996666666999669996669996666999</div>
            <div>9996666666669996666666666666996666666699999966666999999996</div>
        </div>
        <div>
            <el-button v-if="helpBtnShow" @click="drawer = true" type="success"
                       class="help-btn" :class="{'help-btn-show':helpBtnClassShow}">
                眼睛都要瞎啦，求帮助！
            </el-button>
            <el-button v-if="helpBtnShow" @click="nextGame" type="info"
                       class="help-btn" style="float: right;margin-right: 300px" :class="{'help-btn-show':helpBtnClassShow}">
                下一个游戏！
            </el-button>

            <el-drawer
                    style="text-align: center;font-size: 26px"
                    title="真的不再试试了么？"
                    :visible.sync="drawer"
                    ref="drawerOut"
                    :direction="direction"
                    size="30%">
                <div style="margin-top: 30px">
                    <el-button type="primary" @click="closeDraw">再去试试!</el-button>
                    <el-button type="info" @click="innerDrawer = true">TMD&nbsp;快给我提示!</el-button>
                    <el-drawer
                            style="text-align: center;font-size: 26px"
                            title="来啦来啦！"
                            :append-to-body="true"
                            :direction="direction"
                            :visible.sync="innerDrawer"
                            size="25%">
                        <p>要不试试快捷键<span style="color: deepskyblue">ctrl+f</span>查找一下？</p>
                    </el-drawer>
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FindNumberNine",
        data() {
            return {
                drawer: false,
                innerDrawer: false,
                direction: 'ttb',
                helpBtnShow: false,
                helpBtnClassShow: false
            }
        },
        methods: {
            closeDraw() {
                this.$refs.drawerOut.closeDrawer();
            },
            showHelpBtn() {
                setTimeout(() => {
                    this.helpBtnShow = true;
                }, 5200);
                setTimeout(() => {
                    this.helpBtnClassShow = true;
                }, 6000);
            },
            nextGame(){
                this.$message({
                    type:'success',
                    message:'没有小游戏了，看看这个吧'
                });
                this.$router.push({
                    name:'WordAnimation'
                })

            }
        },
        mounted() {
            this.showHelpBtn();
        }
    }
</script>

<style scoped>
    .fnn-title {
        margin: 120px auto;
        text-align: center;

    }

    .number {
        width: 1200px;
        color: green;
        font-family: "Times New Roman", Times, serif;
        margin: 0 auto;
        padding: 50px;
        font-size: 1.5rem;
        text-align: center;
        background-color: lightskyblue;
        border-radius: 30px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    .help-btn {
        margin-left: 300px;
        margin-top: 160px;
        opacity: 0;
        transition: all 2s
    }
    .help-btn-show{
        opacity:1
    }
</style>