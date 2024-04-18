---
title: Styrelsen
description: Här är en presentation av oss i styrelsen
date: 2023-04-14
published: true
---

<script lang="ts">import { Section, TeamWrapper, TeamHeader, TeamBody, TeamItem, Facebook, Github, Twitter } from "flowbite-svelte-blocks";
let members = [
  {
    href: "/",
    src: "/images/profile/sania.png",
    alt: "Sania Bäckström",
    name: "Sania Bäckström",
    jobTitle: "Kassör",
    description: "Bonnie drives the technical strategy of the flowbite platform and brand."
  },
  {
    href: "/",
    src: "/images/profile/erik.png",
    alt: "Erik Bäckström",
    name: "Erik Bäckstörm",
    jobTitle: "Sekreterare",
    description: "Jese drives the technical strategy of the flowbite platform and brand."
  },
  {
    href: "/",
    src: "/images/profile/tony.png",
    alt: "Tony Jansson",
    name: "Tony Jansson",
    jobTitle: "Ledamot",
    description: "Michael drives the technical strategy of the flowbite platform and brand"
  },
  {
    href: "/",
    src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png",
    alt: "Lana Byrd",
    name: "Lana Byrd",
    jobTitle: "Marketing & Sale",
    description: "Lana drives the technical strategy of the flowbite platform and brand."
  }
];
</script>

<div>
      {#each members as { href, src, alt, name, jobTitle, description }}
        <div class="flex h-80 w-auto bg-red-200 mx-5">
        <div>
            <img width={200} alt={alt} src={src} />
        </div>
        <div>
            <b>{name}</b><br />
            {jobTitle}
        </div>
        </div>
      {/each}
</div>
