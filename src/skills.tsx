import ts from './assets/typescript.svg'
import js from './assets/javascript.svg'
import reactLogo from './assets/react.svg'
import node from './assets/node.svg'
import express from './assets/express.svg'
import py from './assets/python.svg'
import flask from './assets/flask.svg'
import pg from './assets/postgres.svg'
import sql from './assets/sql.svg'
import tailwind from './assets/tailwind.svg'
import git from './assets/git.svg'
import html from './assets/html.svg'
import css from './assets/css.svg'
import java from './assets/java.svg'
import mongo from './assets/mongodb.svg'
import mysql from './assets/mysql.svg'
import docker from './assets/docker.svg'
import linux from './assets/linux.svg'

type Skill = { name: string; icon: string }

export const skills: Skill[] = [
  { name: 'TypeScript', icon: ts },
  { name: 'JavaScript', icon: js },
  { name: 'React', icon: reactLogo },
  { name: 'Node.js', icon: node },
  { name: 'Express', icon: express },
  { name: 'Python', icon: py },
  { name: 'Flask', icon: flask },
  { name: 'PostgreSQL', icon: pg },
  { name: 'SQL', icon: sql },
  { name: 'MongoDB', icon: mongo },
  { name: 'MySQL', icon: mysql },
  { name: 'TailwindCSS', icon: tailwind },
  { name: 'Git', icon: git },
  { name: 'Docker', icon: docker },
  { name: 'Linux', icon: linux },
  { name: 'HTML', icon: html },
  { name: 'CSS', icon: css },
  { name: 'Java', icon: java },
]
