import Image from "next/image";
import battery from "public/icons/battery.svg";
import close from "public/icons/close.svg";
import discord from "public/icons/discord.svg";
import drop from "public/icons/drop.svg";
import expandArrow from "public/icons/expandArrow.svg";
import facebook from "public/icons/facebook.svg";
import flash from "public/icons/flash.svg";
import focus from "public/icons/focus.svg";
import gluten from "public/icons/gluten.svg";
import gmp from "public/icons/gmp.svg";
import growth from "public/icons/growth.svg";
import haccp from "public/icons/haccp.svg";
import hang from "public/icons/hang.svg";
import hide from "public/icons/hide.svg";
import info from "public/icons/toast-info.svg";
import instagram from "public/icons/instagram.svg";
import leaf from "public/icons/leaf.svg";
import length from "public/icons/length.svg";
import menu from "public/icons/menu.svg";
import more from "public/icons/more.svg";
import packaging from "public/icons/packaging.svg";
import pinterest from "public/icons/pinterest.svg";
import recycle from "public/icons/recycle.svg";
import reddit from "public/icons/reddit.svg";
import rucksack from "public/icons/rucksack.svg";
import sent from "public/icons/sent.svg";
import shoppingCart from "public/icons/shoppingCart.svg";
import success from "public/icons/toast-success.svg";
import sugar from "public/icons/sugar.svg";
import tiktok from "public/icons/tiktok.svg";
import twitch from "public/icons/twitch.svg";
import twitter from "public/icons/twitter.svg";
import user from "public/icons/user.svg";
import warning from "public/icons/toast-warning.svg";
import weibo from "public/icons/weibo.svg";
import youtube from "public/icons/youtube.svg";

export interface IconProps {
  type:
    | "twitch"
    | "youtube"
    | "battery"
    | "haccp"
    | "leaf"
    | "sugar"
    | "gluten"
    | "gmp"
    | "close"
    | "drop"
    | "expandArrow"
    | "facebook"
    | "flash"
    | "growth"
    | "hide"
    | "instagram"
    | "length"
    | "menu"
    | "pinterest"
    | "recycle"
    | "reddit"
    | "rucksack"
    | "sent"
    | "shoppingCart"
    | "twitter"
    | "hang"
    | "expandArrow"
    | "hamburger"
    | "user"
    | "success"
    | "warning"
    | "info"
    | "weibo"
    | "tiktok"
    | "discord"
    | "focus"
    | "packaging"
    | "more"
    | string;
  width?: number;
  height?: number;
  className?: string;
}

const Icon = ({ type, className, width, height }: IconProps) => {
  let graphic;
  switch (type) {
    case "battery":
      graphic = battery;
      break;
    case "twitch":
      graphic = twitch;
      break;
    case "youtube":
      graphic = youtube;
      break;
    case "close":
      graphic = close;
      break;
    case "drop":
      graphic = drop;
      break;
    case "expandArrow":
      graphic = expandArrow;
      break;
    case "facebook":
      graphic = facebook;
      break;
    case "flash":
      graphic = flash;
      break;
    case "growth":
      graphic = growth;
      break;
    case "hide":
      graphic = hide;
      break;
    case "instagram":
      graphic = instagram;
      break;
    case "length":
      graphic = length;
      break;
    case "menu":
      graphic = menu;
      break;
    case "packaging":
      graphic = packaging;
      break;
    case "pinterest":
      graphic = pinterest;
      break;
    case "recycle":
      graphic = recycle;
      break;
    case "reddit":
      graphic = reddit;
      break;
    case "rucksack":
      graphic = rucksack;
      break;
    case "sent":
      graphic = sent;
      break;
    case "shoppingCart":
      graphic = shoppingCart;
      break;
    case "twitter":
      graphic = twitter;
      break;
    case "user":
      graphic = user;
      break;
    case "weibo":
      graphic = weibo;
      break;
    case "discord":
      graphic = discord;
      break;
    case "success":
      graphic = success;
      break;
    case "info":
      graphic = info;
      break;
    case "warning":
      graphic = warning;
      break;
    case "hang":
      graphic = hang;
      break;
    case "info":
      graphic = info;
      break;
    case "tiktok":
      graphic = tiktok;
      break;
    case "haccp":
      graphic = haccp;
      break;
    case "leaf":
      graphic = leaf;
      break;
    case "sugar":
      graphic = sugar;
      break;
    case "gluten":
      graphic = gluten;
      break;
    case "gluten":
      graphic = gluten;
      break;
    case "gmp":
      graphic = gmp;
      break;
    case "more":
      graphic = more;
      break;
    case "focus":
      graphic = focus;
      break;
  }
  return (
    <>
      <Image
        className={`fill-current ${className}`}
        src={graphic}
        alt={`GAZZD icon`}
        width={width ?? 32}
        height={height ?? 32}
      />
    </>
  );
};

export default Icon;
