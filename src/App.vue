<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    html,body {
        width: 100%;
        height: 100%;
        position: relative;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .lr {
        margin: 0 7px;
    }
    p {
        margin: 0;
    }
    .spacing {
        margin-top:10px;
        margin-bottom: 10px;
    }
    .clearfix {
        &:after {
            content: '';
            display: block;
            visibility: hidden;
            width:0 ;
            height: 0;
            clear: both;
        }
    }
</style>
