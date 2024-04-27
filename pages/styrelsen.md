---
title: Styrelsen
date: 2023-04-14
description: Här är en presentation av oss i styrelsen
published: true
---
<script lang="ts">
import { Profile}  from '$components'

const style = "close"

let members= [
  {
    href: "/",
    src: `/images/profile/${style}/blank.webp`,
    gif: "",
    alt: "Per Larsson",
    name: "Per Larsson",
    title: "Ordförande",
  },
{
    href: "/",
    src: `/images/profile/${style}/sania.png`,
    gif: "/images/unicorn-drinking-boba.gif",
    alt: "Sania Bäckström",
    name: "Sania Bäckström",
    title: "Kassör",
  },
  {
    href: "/",
    src: `/images/profile/${style}/erik.png`,
    gif: "random",
    alt: "Erik Bäckström",
    name: "Erik Bäckström",
    title: "Sekreterare",
  },
  {
    href: "/",
    src: `/images/profile/${style}/tony.png`,
    gif: "/images/judo.gif",
    alt: "Tony Jansson",
    name: "Tony Jansson",
    title: "Ledamot",
  },
    {
    href: "/",
     src: `/images/profile/${type}/mattias.png`,
    gif: "random",
    alt: "Mattias Wallinius",
    name: "Mattias Wallinius",
    title: "Ledamot",
  },
      {
    href: "/",
    src: `/images/profile/${style}/blank.webp`,
    gif: "random",
    alt: "Jimmy Falk",
    name: "Jimmy Falk",
    title: "Suppleant",
  },
  
];


</script>

<br />
<div class="not-prose flex flex-wrap justify-between bg-slate w-full">
      {#each members as { gif, href, src, alt, name, title, description, transition }}
            <Profile name={name} title={title} image={src} gif={gif} />
      {/each}
</div>
