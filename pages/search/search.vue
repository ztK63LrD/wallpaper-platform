<template>
	<view class="searchLayout">
		<!-- 输入框 -->
		<view class="search">
			<uni-search-bar 
				@confirm="onSearch"
				@cancel="onClear"
				@clear="onClear"
				focus 
				placeholder="搜索"
				v-model="queryParams.keyword"
			>
			</uni-search-bar>
		</view>
		<!-- 历史记录 -->
		<view v-if="!classList.length || noSearch">
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>		
				</view>
			</view>
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>				
				</view>
				<view class="tabs">				
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>
		<!-- 空状态 -->
		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>
		<!-- 列表界面 -->
		<view v-else>
			<view class="list">
				<navigator 
					:url="`/pages/preview/preview?id=${item._id}`"  
					class="item" 
					v-for="item in classList" 
					:key="item._id"
				>				
					<image :src="item.smallPicurl" mode="aspectFill"></image>				
				</navigator>
			</view>		
			<view class="loadingLayout" v-if="noData || classList.length">
				<uni-load-more :status="noData ? 'noMore':'loading'"/>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onReachBottom } from "@dcloudio/uni-app";
import { apiSearchData } from "@/api/search.js"

const historySearch = ref(uni.getStorageSync("historySearch") || []); //搜索历史词
const recommendList = ref(["美女","帅哥","宠物","卡通"]); //热门搜索词
const noData = ref(false); //没有更多
const noSearch = ref(false); //没有搜索结果
const classList = ref([]) //搜索结果列表
const queryParams = ref({ //查询参数	 
	pageNum:1,
	pageSize:12,
	keyword:""
})
// 初始化参数数据
const initParams = (value='') => {
	classList.value = []
	noData.value = false
	noSearch.value = false
	queryParams.value = {
		pageNum: 1,
		pageSize:12,
		keyword: value || ""
	}
}
// 获取搜索结果数据
const getSearchData = async () => {
	try {
		let res = await apiSearchData(queryParams.value)
		classList.value = [...classList.value, ...res.data]
		uni.setStorageSync("storgClassList", classList.value)
		if (queryParams.value.pageSize > res.data.length) noData.value = true
		if (res.data.length == 0 && classList.value.length == 0) noSearch.value = true
	} finally {
		uni.hideLoading()
	}
}
//点击搜索
const onSearch = ()=>{
	uni.showLoading()
	historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10)
	uni.setStorageSync("historySearch", historySearch.value)
	initParams(queryParams.value.keyword)
	getSearchData()
}
//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				uni.removeStorageSync("historySearch")
				historySearch.value = []
			}
		}
	})
}
//点击标签进行搜索
const clickTab = (value)=>{
	initParams(value)
	onSearch()
}
//点击清除按钮
const onClear = ()=>{
	initParams()
}
//触底加载更多
onReachBottom(()=>{
	if (noData.value) return
	queryParams.value.pageNum++
	getSearchData()
})

//关闭有页面
onUnload(()=>{
	uni.removeStorageSync("storgClassList", classList.value)
})
</script>

<style lang="scss" scoped>
.searchLayout{
	.search{
		padding:0 10rpx;
	}
	.topTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color:#999;
	}
	.history{
		padding:30rpx;		
	}
	.recommend{
		padding:30rpx;
	}
	.tabs{
		display: flex;		
		align-items: center;
		flex-wrap: wrap;
		padding-top:20rpx;
		.tab{
			background: #F4F4F4;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}	
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding:20rpx 5rpx;		
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}			
		}		
	}
}
</style>
