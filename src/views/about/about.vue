<template>
    <Layout class="news-list" :title="'新闻中心'">
        <div class="about-us">
            <div class="title">培训中心介绍</div>
            <div class="content">
                湖南省健康服务业协会培训中心是从事健康服务业人才培养的专业机构，是湖南省人力资源社会保障厅正式批准的国家职业技能鉴定所。  2005年---2009年卫生部健康管理师培训湖南省定点执行单位，2010年湖南省人社厅健康管理师新职业主要开发单位。培训中心自成立以来，一直以：为社会培养有用的人才，为老百姓的健康保驾护航，为学员提供最好的师资，最优质的服务为己任；培训中心的宗旨是“感恩、真诚、自信、拼搏”。
            </div>
            <div class="content">
                我们拥有多家实习机构和会员单位，因此，我们培训的健康管理师、心理咨询师、育婴师、营养师既可以推荐其直接从事相关工作，又可以支持其自主创业。为造就一批理论知识丰富、实践能力更强的专业人才队伍而努力！
            </div>
            <div class="pic clearfix">
                <img src="/static/imgs/m_n_c_9b1eda11.jpg" alt="">
            </div>
            <div class="title title2">部分培训实习基地</div>
            <div class="pic clearfix">
                <img src="/static/imgs/m_n_c_a02e1ab9.jpg" alt="">
            </div>
        </div>
    </Layout>
</template>
<script>
    import Layout from '@/views/layout/layout'
    export default {
        name: 'aboutUs',
        components: {
            Layout
        }
    }
</script>
<style rel="stylesheet/sccss" lang="scss" scoped>
    .about-us {
        padding: 10px;
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            text-align: center;
            line-height: 30px;
        }
        .content {
            font-size: 14px;
            color: #666;
            text-indent: 20px;
            line-height: 25px;
        }
        .pic img {
            display: block;
            margin: 0 auto;
            width: 100%;
        }
    }
</style>