//IMPORTAR MODULOS
const { request } = require("express");
const express = require("express");
const app = express();
const pool = require("../mysql/mysql_connect");
const controller_links = {};

/*****************RENDERIZAR VISTAS******************/
//view add
controller_links.add_get = async (req, res) => {
  res.render('links/add');
}; 
//View list
controller_links.list_get = async (req, res) => {
  const user_id = req.user.id;
  console.log('id view', user_id)
  const links = await pool.query(`SELECT * FROM links WHERE user_id=${user_id}`);
  res.render('links/list', { links });
};
//View update
controller_links.update_get = async (req, res) => {
  const id = req.params.id;
  const links = await pool.query(`SELECT * FROM links WHERE id = ${id}`);
  res.render('links/update', { links:links[0] });
};
/**************ACCIONES DE LAS VISTAS*****************/

//Create links from db
controller_links.list_add = async (req, res) => {
  const { title, url, description} = req.body;
  const user_id = req.user.id;
  console.log('id user',user_id);
  await pool.query(`INSERT INTO links(title, url, description, user_id) VALUES ("${title}", "${url}", "${description}", ${user_id})`);
  req.flash('success', 'Link saved successfully');
  res.redirect("/links");
};
//Update link from db
controller_links.list_update = async (req, res) => {
  const id = req.params.id;
  const { title, url, description } = req.body;
  await pool.query(`UPDATE links SET title="${title}", url="${url}", description="${description}" WHERE id = ${id}`);
  req.flash('success', 'Link edited successfully');
  res.redirect("/links");
};
//Delete link from db
controller_links.list_del = async (req, res) => {
  const id = req.params.id;
  await pool.query(`DELETE FROM links WHERE id = ${id}`);
  req.flash('success', 'Link removed successfully');
  res.redirect("/links");
};

module.exports = controller_links;
