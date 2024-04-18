import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../pages/${params.slug}.md`);
		//const paths = import.meta.glob(`/src/routes/**/*.md`, { eager: true });

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
