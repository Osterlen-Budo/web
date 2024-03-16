<script>
	import '../app.pcss';
	import logo from '$lib/assets/logo.png';
</script>

<body class="">
	<header class="body-font mt-5 w-full bg-white text-gray-700">
		<div class="flex flex-col items-center justify-center">
			<img class="mb-2" width="200" src={logo} alt="Österlen Budo" />

			<nav class="ml-6">
				<a href="klubben" class="mr-5 font-medium hover:text-gray-900">Klubben 柔道</a>
				<a href="traning" class="mr-5 font-medium hover:text-gray-900">Träning</a>
				<a href="#_" class="font-medium hover:text-gray-900">Styrelsen</a>
			</nav>
		</div>
	</header>
	<slot />
</body>
