import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	try {
		const post = await import(`../../pages/${params.slug}.md`);
		if (!post) {
			throw new Error(`Post not found`);
		}
		if (post.metadata.published === false) {
			throw new Error(`Post not published`);
		}

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
};
