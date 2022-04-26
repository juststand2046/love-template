<template>
    <div id="home">
        <div style="position: fixed;left: 0;top: 0;z-index: 100">
            <button @click="goPrev">上一张</button>
            <button @click="goNext">下一张</button>
        </div>
        <el-carousel ref="carousel" height="937px" direction="vertical" indicator-position="none" :autoplay="false">
            <el-carousel-item name="first">
                <div class="out-box">
                    1
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 @click="h3test" class="medium">canyouqqqqqqqq</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3 class="medium">canyou</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {}
        },
        methods: {
            h3test() {
                console.log(1234)
                this.$refs.carousel.setActiveItem('first');
            },
            goPrev() {
                this.$refs.carousel.prev();
            },
            goNext() {
                this.$refs.carousel.next();
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .out-box {
        width: 1200px;
        height: 700px;
        margin: 100px auto;
        background-color: #fff;
    }
</style>