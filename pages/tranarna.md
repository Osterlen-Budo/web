---
title: Tränarna
description: Här är en presentation av oss i styrelsen
date: 2023-04-14
published: true
---

<script lang="ts">
import { Profile}  from '$components'

const type = "close"

let members = [
    {
    href: "/",
    src: `/images/profile/${type}/tony.png`,
    gif: "/images/judo.gif",
    name: "Tony Jansson",
    title: "Huvudtränare",
    belt: "1 Dan (Svart)",
  },
    {
    href: "/",
    src: `/images/profile/${type}/blank.webp`,
    gif: "",
    name: "Mattias Wallinius",
    title: "Huvudtränare",
    belt: "? Dan (Svart)" ,
  },
  {
    href: "/",
    src: `/images/profile/${type}/madde.png`,
    gif: "random",
    name: "Madeleine Fristedt Nilsson",
    title: "Tränare",
    belt: "1 Kyu (Brun)",
  },
{
    href: "/",
    src: `/images/profile/${type}/hilko.png`,
    gif: "random",
    name: "Hilko Spoelstra",
    title: "Tränare",
    belt: "1 Kyu (Brun)",
  },
  {
    href: "/",
    src: `/images/profile/${type}/paul.png`,
    gif: "random",
    name: "Paul Andersson",
    title: "Tränare",
    belt: "2 Kyu (Blå)",
  },
  {
    href: "/",
    src: `/images/profile/${type}/hannes.png`,
    gif: "random",
    name: "Hannes Alm",
    title: "Hjälptränare",
    belt: "2 Kyu (Blå)",
  },
  {
    href: "/",
    src: `/images/profile/${type}/benjamin.png`,
    gif: "random",
    name: "Benjamin Fristedt",
    title: "Hjälptränare",
    belt: "3 Kyu (Blå-grön)",
  },
    {
    href: "/",
    src: `/images/profile/${type}/alexander.png`,
    gif: "random",
    name: "Alexander Bäckström",
    title: "Hjälptränare",
    belt: "3 Kyu (Grön)",
  },
  {
    href: "/",
    src: `/images/profile/${type}/magdalena.png`,
    gif: "random",
    name: "Magdalena Alm",
    title: "Hjälptränare",
    belt: "3 Kyu (Grön)",
  },
  {
    href: "/",
    src: `/images/profile/${type}/milton.png`,
    gif: "random",
    name: "Milton Holst",
    title: "Hjälptränare",
    belt: "3 Kyu (Grön)",
  },
  
  
];
</script>

<br/>
<div class="not-prose flex flex-wrap justify-center sm:justify-between md:justify-between lg:justify-between">
  {#each members as { gif, href, src, belt, name, title, transition }}
        <Profile name={name} title={title} image={src} gif={gif}  belt={belt}/>
  {/each}

</div>