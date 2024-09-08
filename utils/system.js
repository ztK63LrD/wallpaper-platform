// 获取手机系统相关信息
const system = uni.getSystemInfoSync() 
// 获取内容距离手机顶部的高度
export const getStatusBarHeight = () => system.statusBarHeight || 40
// 获取胶囊按钮的高度操作
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let { top, height } = uni.getMenuButtonBoundingClientRect()
		return height + (top - getStatusBarHeight())*2
	} else {
		return 40
	}
}
// 整体的nav高度操作
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()