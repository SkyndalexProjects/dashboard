<script lang="ts">
	const { children, type, style = '' } = $props();
</script>

<div class="alert {type} {style}">
	{#if type === 'warning'}
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			xmlns="http://www.w3.org/2000/svg"
			class="alert-icon"
		>
			<path
				d="M26.8376 26.2499H3.16258C2.93844 26.2563 2.71674 26.2021 2.52084 26.093C2.32493 25.984 2.16209 25.824 2.04947 25.6302C1.93684 25.4363 1.87862 25.2156 1.88093 24.9914C1.88323 24.7672 1.94599 24.5477 2.06258 24.3562L13.9176 3.81244C14.0273 3.62244 14.1851 3.46465 14.3751 3.35495C14.5651 3.24525 14.7807 3.1875 15.0001 3.1875C15.2195 3.1875 15.435 3.24525 15.6251 3.35495C15.8151 3.46465 15.9729 3.62244 16.0826 3.81244L27.9376 24.3562C28.0542 24.5477 28.1169 24.7672 28.1192 24.9914C28.1215 25.2156 28.0633 25.4363 27.9507 25.6302C27.8381 25.824 27.6752 25.984 27.4793 26.093C27.2834 26.2021 27.0617 26.2563 26.8376 26.2499Z"
				fill="url(#paint0_linear_1331_1251)"
			/>
			<g opacity="0.5">
				<path
					d="M26.8376 26.2499H3.16258C2.93844 26.2563 2.71674 26.2021 2.52084 26.093C2.32493 25.984 2.16209 25.824 2.04947 25.6302C1.93684 25.4363 1.87862 25.2156 1.88093 24.9914C1.88323 24.7672 1.94599 24.5477 2.06258 24.3562L13.9176 3.81244C14.0273 3.62244 14.1851 3.46465 14.3751 3.35495C14.5651 3.24525 14.7807 3.1875 15.0001 3.1875C15.2195 3.1875 15.435 3.24525 15.6251 3.35495C15.8151 3.46465 15.9729 3.62244 16.0826 3.81244L27.9376 24.3562C28.0542 24.5477 28.1169 24.7672 28.1192 24.9914C28.1215 25.2156 28.0633 25.4363 27.9507 25.6302C27.8381 25.824 27.6752 25.984 27.4793 26.093C27.2834 26.2021 27.0617 26.2563 26.8376 26.2499Z"
					fill="url(#paint1_linear_1331_1251)"
				/>
				<path
					d="M26.8376 26.2499H3.16258C2.93844 26.2563 2.71674 26.2021 2.52084 26.093C2.32493 25.984 2.16209 25.824 2.04947 25.6302C1.93684 25.4363 1.87862 25.2156 1.88093 24.9914C1.88323 24.7672 1.94599 24.5477 2.06258 24.3562L13.9176 3.81244C14.0273 3.62244 14.1851 3.46465 14.3751 3.35495C14.5651 3.24525 14.7807 3.1875 15.0001 3.1875C15.2195 3.1875 15.435 3.24525 15.6251 3.35495C15.8151 3.46465 15.9729 3.62244 16.0826 3.81244L27.9376 24.3562C28.0542 24.5477 28.1169 24.7672 28.1192 24.9914C28.1215 25.2156 28.0633 25.4363 27.9507 25.6302C27.8381 25.824 27.6752 25.984 27.4793 26.093C27.2834 26.2021 27.0617 26.2563 26.8376 26.2499Z"
					fill="url(#paint2_linear_1331_1251)"
				/>
				<path
					d="M26.8376 26.2499H3.16258C2.93844 26.2563 2.71674 26.2021 2.52084 26.093C2.32493 25.984 2.16209 25.824 2.04947 25.6302C1.93684 25.4363 1.87862 25.2156 1.88093 24.9914C1.88323 24.7672 1.94599 24.5477 2.06258 24.3562L13.9176 3.81244C14.0273 3.62244 14.1851 3.46465 14.3751 3.35495C14.5651 3.24525 14.7807 3.1875 15.0001 3.1875C15.2195 3.1875 15.435 3.24525 15.6251 3.35495C15.8151 3.46465 15.9729 3.62244 16.0826 3.81244L27.9376 24.3562C28.0542 24.5477 28.1169 24.7672 28.1192 24.9914C28.1215 25.2156 28.0633 25.4363 27.9507 25.6302C27.8381 25.824 27.6752 25.984 27.4793 26.093C27.2834 26.2021 27.0617 26.2563 26.8376 26.2499Z"
					fill="url(#paint3_linear_1331_1251)"
				/>
			</g>
			<path
				d="M16.25 21.875C16.25 22.1222 16.1767 22.3639 16.0393 22.5695C15.902 22.775 15.7068 22.9352 15.4784 23.0299C15.2499 23.1245 14.9986 23.1492 14.7561 23.101C14.5137 23.0528 14.2909 22.9337 14.1161 22.7589C13.9413 22.5841 13.8223 22.3613 13.774 22.1189C13.7258 21.8764 13.7505 21.6251 13.8452 21.3966C13.9398 21.1682 14.1 20.973 14.3055 20.8357C14.5111 20.6983 14.7528 20.625 15 20.625C15.3315 20.625 15.6495 20.7567 15.8839 20.9911C16.1183 21.2255 16.25 21.5435 16.25 21.875ZM15.5788 10.625H14.4213C14.3353 10.6248 14.2502 10.6423 14.1714 10.6764C14.0925 10.7106 14.0215 10.7606 13.9628 10.8235C13.9042 10.8863 13.8591 10.9605 13.8305 11.0416C13.8018 11.1226 13.7901 11.2086 13.7963 11.2944L14.3319 18.7944C14.3431 18.9523 14.4139 19.1001 14.5299 19.2079C14.6459 19.3157 14.7985 19.3754 14.9569 19.375H15.0431C15.2015 19.3754 15.3541 19.3157 15.4701 19.2079C15.5861 19.1001 15.6569 18.9523 15.6681 18.7944L16.2038 11.2944C16.2099 11.2086 16.1982 11.1226 16.1695 11.0416C16.1409 10.9605 16.0958 10.8863 16.0372 10.8235C15.9785 10.7606 15.9075 10.7106 15.8286 10.6764C15.7498 10.6423 15.6647 10.6248 15.5788 10.625Z"
				fill="url(#paint4_linear_1331_1251)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_1331_1251"
					x1="15.0001"
					y1="3.18807"
					x2="15.0001"
					y2="26.2499"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stop-color="#FFD782" />
					<stop offset="0.161" stop-color="#FED57C" />
					<stop offset="0.372" stop-color="#FCCE6C" />
					<stop offset="0.61" stop-color="#F9C351" />
					<stop offset="0.867" stop-color="#F4B42B" />
					<stop offset="1" stop-color="#F1AB15" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_1331_1251"
					x1="15.0001"
					y1="3.18807"
					x2="15.0001"
					y2="26.2499"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stop-color="#FFD375" stop-opacity="0" />
					<stop offset="0.382" stop-color="#FFD374" stop-opacity="0.01" />
					<stop offset="0.52" stop-color="#FED171" stop-opacity="0.039" />
					<stop offset="0.619" stop-color="#FCCE6B" stop-opacity="0.092" />
					<stop offset="0.698" stop-color="#FACA63" stop-opacity="0.167" />
					<stop offset="0.766" stop-color="#F7C458" stop-opacity="0.265" />
					<stop offset="0.826" stop-color="#F3BD4A" stop-opacity="0.387" />
					<stop offset="0.881" stop-color="#EFB53B" stop-opacity="0.531" />
					<stop offset="0.931" stop-color="#E9AC28" stop-opacity="0.7" />
					<stop offset="0.975" stop-color="#E4A214" stop-opacity="0.884" />
					<stop offset="1" stop-color="#E09B07" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_1331_1251"
					x1="2.2407"
					y1="25.9481"
					x2="22.1832"
					y2="13.9656"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stop-color="#FFD375" stop-opacity="0" />
					<stop offset="0.382" stop-color="#FFD374" stop-opacity="0.01" />
					<stop offset="0.52" stop-color="#FED171" stop-opacity="0.039" />
					<stop offset="0.619" stop-color="#FCCE6B" stop-opacity="0.092" />
					<stop offset="0.698" stop-color="#FACA63" stop-opacity="0.167" />
					<stop offset="0.766" stop-color="#F7C458" stop-opacity="0.265" />
					<stop offset="0.826" stop-color="#F3BD4A" stop-opacity="0.387" />
					<stop offset="0.881" stop-color="#EFB53B" stop-opacity="0.531" />
					<stop offset="0.931" stop-color="#E9AC28" stop-opacity="0.7" />
					<stop offset="0.975" stop-color="#E4A214" stop-opacity="0.884" />
					<stop offset="1" stop-color="#E09B07" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_1331_1251"
					x1="27.3345"
					y1="26.5799"
					x2="7.49695"
					y2="13.6974"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stop-opacity="0" />
					<stop offset="0.382" stop-color="#FFD374" stop-opacity="0.01" />
					<stop offset="0.52" stop-color="#FED171" stop-opacity="0.039" />
					<stop offset="0.619" stop-color="#FCCE6B" stop-opacity="0.092" />
					<stop offset="0.698" stop-color="#FACA63" stop-opacity="0.167" />
					<stop offset="0.766" stop-color="#F7C458" stop-opacity="0.265" />
					<stop offset="0.826" stop-color="#F3BD4A" stop-opacity="0.387" />
					<stop offset="0.881" stop-color="#EFB53B" stop-opacity="0.531" />
					<stop offset="0.931" stop-color="#E9AC28" stop-opacity="0.7" />
					<stop offset="0.975" stop-color="#E4A214" stop-opacity="0.884" />
					<stop offset="1" stop-color="#E09B07" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_1331_1251"
					x1="15"
					y1="10.625"
					x2="15"
					y2="23.125"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#4A4A4A" offset="0" />
					<stop offset="1" stop-color="#212121" />
				</linearGradient>
			</defs>
		</svg>
	{:else if type === 'info'}
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			xmlns="http://www.w3.org/2000/svg"
			class="alert-icon"
		>
			<g clip-path="url(#clip0_1330_1011)">
				<path
					d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 6.71625 6.71625 0 15 0C23.2837 0 30 6.71625 30 15Z"
					fill="#2196F3"
				/>
				<path
					d="M14.1919 13.9071H16.9611V21.9233H14.1919V13.9071ZM17.3072 9.89901C17.3072 10.9039 16.5312 11.7209 15.5765 11.7209C14.6218 11.7209 13.8457 10.9039 13.8457 9.89901C13.8457 8.89407 14.6218 8.07715 15.5765 8.07715C16.5312 8.07715 17.3072 8.89407 17.3072 9.89901Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1330_1011">
					<rect width="30" height="30" fill="white" />
				</clipPath>
			</defs>
		</svg>
	{/if}

	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.alert {
		display: inline-flex;
		height: 60px;
		align-items: center;
		flex-shrink: 0;
		border-radius: 5px;
		border-left: 10px solid #f1ab15;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		gap: 15px;
		text-align: left;
		text-wrap: wrap;
		overflow-wrap: break-word;
		font:
			700 16px / normal '--font-vietnam',
			sans-serif;
		padding-right: 20px;
		width: var(--alert-width);
		max-width: var(--alert-max-width);
	}
	.alert-icon {
		flex-shrink: 0;
		padding-left: 12px;
	}
	.alert.warning {
		border-left: 10px solid #f1ab15;
	}
	.alert.info {
		border-left: 10px solid #275ee7;
	}
	.content {
		display: inline-block;
	}
</style>
