<template>
	<view class="subject">
		<view class="bankcard">
			<view class="contre">
				<view>
					<text>{{bank}}</text>
				</view>
				<view>
					<text>{{bankCard}}</text>
				</view>
			</view>

		</view>
		<view class="change" @tap="change_bankcard">
			<text>更换银行卡>></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// bankCard : wx.getStorageSync('curUser').bankCard,
				// bank : wx.getStorageSync('curUser').bank
				bankCard: null,
				bank: null
			};
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.gain_bci()
		},
		methods: {
			change_bankcard() {
				uni.navigateTo({
					url: "/pages/change_bank/change_bank"
				})
			},
			gain_bci() {
				let bankCard = uni.getStorageSync('curUser').bankCard
				// bankCard = "" + bankCard;
				let sum = ""
				for (var i = 0; i < bankCard.length - 2; i++) {
					sum += "*"
					if ((i + 1) % 4 === 0) {
						sum += " "
					}
				}
				var bankCard_number = sum + bankCard.substr(bankCard.length - 1)
				let bank = uni.getStorageSync('curUser').bank
				this.bankCard = bankCard_number,
					this.bank = bank
			}
		},
		components: {},
		props: {},

	};
</script>
<style>
	@import "./bank_card.css";
</style>
