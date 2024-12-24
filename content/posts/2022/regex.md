---
title: "Save HOURS of work with Regex"

date: 2022-08-05
url: /regex/
image: images/2022-thumbs/regex.webp
categories:
  - Linux
  - Windows
tags:
  - RegEx
draft: false
---
RegEx is a formidable tool that many just don't understand, but can save literally thousands of hours of work.
<!--more-->
{{< tweet user="christitustech" id="1553598175314845697" >}}

However, for many years I just couldn't be bothered to learn anything beside the basics `.*` or `[a-z]`. I just had a project pop up where I'd have to spend hours finding and replacing a complex markdown line I was using to pull images and a video link. The solution was painfully obvious... either I get better with RegEx or spend hours finding and replacing text in hundreds of posts.

## Understanding RegEx
Learning all the syntax for RegEx is not happening for me and probably many others. There is a solution for this and you don't need to... <https://regexr.com/>

![text-example](/images/2022/regex/text-example.webp)

Now that you have an explainer of all the syntax and cheat sheet. We just need to know a few basic features of RegEx, so you can perfect the pattern that you need. Also, the need to understand groups and variables will make the find and replace much more powerful. 

## Making the Perfect Pattern
With our test example on regexr.com we can test our pattern to make sure we match exactly what we need. Now normally a guide would start talking about `.*` and other match characters, but frankly any site like regexr or regex101.com, will have those laid out for you. 

Instead, let's talk about escaping characters and how to match weird expressions that have syntax like `[,(,+,?` and more. All these can really mess up matching your pattern. So you need to *escape* the with a `\` before the symbol, so it would look something like this `\[blah\]` this is regex speak for `[blah]` the escaping character makes it actually register the bracket or parenthesis. Without it, it will probably just give you some syntax error. 

The websites I gave above are perfect for pointing out flaws in your pattern or maybe you missed escaping that + sign or question mark. It's why having these syntax sites available is vital. 

## Selection Groups
Now that you understand how to match things with RegEx you can wipe out things with ease, but what about saving that bit of the match you need? 

Example (I want to save youtube video id):

```
img.youtube.com/vi/0q3rGKIMZg
```

Using this Regex will clean it up and save the id using the selection group. 

```
.*vi\/(.*)
```

This will match and SELECT everything after `vi/`  with `(.*)` in the string, where `.*vi\/` matches `img.youtube.com/vi/`. The value `0q3rGKIMZg` will be stored in `$1` which is the first selection group. If you do multiple `()` selections the second one would be `$2` and so on.

Example new format from old `{{ youtube 0q3rGKIMZg }}`

The replace field would simply be `{{ youtube $1 }}`

## Walkthrough Video

{{< youtube uwtPH6owqZA >}}