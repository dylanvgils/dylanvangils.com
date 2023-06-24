---
draft: false
date: 2023-06-24T12:56:00+02:00
title: "Manage dotfiles with the convenience of git"
tags: [dotfiles, git, terminal]
categories: [Linux]
---
In 2019 I discovered the concept of managing your Linux terminal configuration using git. This concept is also known as dotfiles. When I first read this, I liked the idea because I regularly switch between computers. Furthermore, I have the habit of breaking my distro whenever I'm trying out something new 😊. Luckily it is becoming more and more stable in recent years.

So wouldn't it be nice if we could reinstall our terminal configuration with the ease of a few commands? It is if you ask me. In this blog post, I'll take you along my journey of managing dotfiles with the convenience of git.

{{< context >}}
First start with a little bit of background. I'm working on multiple computers and with multiple operating systems. At the time of writing this post, I'm mainly using Fedora (Linux) and Windows with WSL enabled. That is why I needed to share my terminal configuration across multiple computers and operating systems. I use a minimal set of dependencies, which are [Oh My ZSH](https://ohmyz.sh/), [vim](https://www.vim.org/), and [tmux](https://github.com/tmux/tmux/wiki).

So in the most minimal form, my home directory structure will look like:

```text{lineNos=false}
/home/dylan/
|-- .oh-my-zsh/
|-- .tmux/
|-- .vim/
|-- .zshenv
|-- .zshrc
|-- dotfiles/
```
{{< /context >}}

## Bare git repository

The first [article](https://harfangk.github.io/2016/09/18/manage-dotfiles-with-a-git-bare-repository.html) I stumbled upon was about managing dotfiles with a bare git repository. So I tried this out, and I have to say it was working quite well in the beginning. The idea behind the bare git repository is turning your home directory (`~/`) into a git repository. You can achieve this by executing the following command:

```sh{lineNos=false}
git init --bare $HOME/.dotfiles.git
```

Now we have one problem, how to interact with the bare repository created? You can do this by providing the `--git-dir` and `--work-tree` flags to the git command. This is still not as convenient as I like it to be. As an improvement, we can add an alias in the rc file (e.g. `.zshrc`):

```sh{lineNos=false}
echo 'alias dotfiles="/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME"' >> $HOME/.zshrc
```

Now we can interact with the dotfiles repository using the `dotfiles <git-command>`, for example, to commit a file:

```sh{lineNos=false}
dotfiles .zshrc -m "Add dotfiles git alias"
```

To get started on a different computer. We can simply recreate the alias and clone the repository into the home directory using the following command:

```sh{lineNos=false}
git clone --bare <repo-url> $HOME/.dotfiles.git
```


## Regular git repository is the way to go

The process of managing dotfiles described in the previous section worked quite well for a while, but it has its limitations. The most annoying one is that every file in the home directory could accidentally be checked-in to git. This can be avoided by creating an allowlist using the `.gitignore` file. But still, this didn't work the way I wanted it to. That is why I started to turn my dotfiles repository into a regular git repository.

The start was simple. I created a new directory inside my home directory, called `dotfiles`. But then you still have a problem. How to get the files inside the folder installed into the home directory? I ended up using [GNU Stow](https://www.gnu.org/software/stow/) for this. Stow is a symlink farm manager which takes distinct packages of software and/or data located in separate directories on the filesystem and makes them appear to be installed in the same place.

With Stow, I was able to create a [makefile](https://www.gnu.org/software/make/), which made it easy to install or uninstall the packages into my home directory. The basic makefile looked like:

```makefile
all:
	stow --target=$$HOME --restow tmux
	stow --target=$$HOME --restow zsh

delete:
	stow --target=$$HOME --delete */
```

Installing or updating the dotfiles now becomes as easy as running the following command:

```sh{lineNos=false}
make
```

To delete all symlinks related to the dotfiles just run:

```sh{lineNos=false}
make delete
```

Now we ended up with an easy way to install or uninstall dotfiles in the home directory. Now we need a way to enhance the configuration with things such as dependencies and computer-specific configuration. The following sections will go deeper into this.


## Managing dependencies
Only checking-in configuration files don't add any value. Somehow you want to be able to manage dependencies, such as:

- zsh plugins
- tmux plugins
- vim plugins

For managing dependencies I opted for [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Git submodules allow you to include other projects as a subdirectory in your own project.

{{< citation source="[git-scm.com](https://git-scm.com/book/en/v2/Git-Tools-Submodules)" >}}
It often happens that while working on one project, you need to use another project from within it. Perhaps it’s a library that a third party developed or that you’re developing separately and using in multiple parent projects. A common issue arises in these scenarios: you want to be able to treat the two projects as separate yet still be able to use one from within the other.
{{< /citation >}}

Adding a git submodule can be done by using the `git submodule` command. Let's say we want to add the `bar` plugin to Vim. This can be achieved with the following command:

```sh{lineNos=false}
git submodule add git@github.com/foo/bar.git pack/plugins/start/bar
```

Updating all the git submodules added to the repository is also easy and can be done with the following command:

```sh{lineNos=false}
git submodule update --recursive --remote
```


## Computer-specific configuration

One last challenge I had was computer-specific configuration. I ended up adding an optional file suffixed with `.local`. To load the computer-specific configuration I created a function that will source a file when it exists:

```sh
include() {
  [[ -f "$1" ]] && source "$1"
}
```

The most appealing use case of an optional file is the use of aliases. On each computer I want to use different aliases. When I create a `aliases.local` file in my home directory it is automatically included once the shell is reloaded. This all works because the `.zshrc` file includes the optional aliases using the include function:

```sh{lineNos=false}
include ~/.aliases.local
```


## Conclusion

I've tried a few ways to make it easier for me to manage, install/uninstall and share my Linux terminal configuration across multiple computers. For myself, I did find the sweet spot in ease of use versus configurability and extensibility.

I hope you learned something from this post. In case you want to try it yourself or want some inspiration. You can have a look at my [dotfiles](https://github.com/dylanvgils/dotfiles) repository on GitHub.