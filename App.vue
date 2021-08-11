<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	// import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		components: {
		uniSearchBar,
		uniSegmentedControl,
		uniIcons,
		// uniPopup,
		// uniPopupMessage,
  //       uniPopupDialog
		}
		
	}
</script>

<style>
	/*每个页面公共css */
	@import "./style/iconfont.css";
</style>
