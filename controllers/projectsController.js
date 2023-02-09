const createHttpError = require("http-errors");
const Project = require("../database/models/Project");
const errorResponse = require("../helpers/errorResponse");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    list : async (req,res) => {
        try {

            const projects = await Project.find().where('createdBy').equals(req.user).select('name client');

            return res.status(200).json({
                ok : true,
                msg :'Lista de Proyectos',
                projects: projects
            });

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECTS-LIST'
            })
        }
       
    },
    store : async (req,res) => {
        try {

            const {name,description,client} = req.body;

            if([name,description,client].includes('')|| !name || !description || !client) throw createHttpError(400,'All fields are required');

            if(!req.user) throw createHttpError(401,'auth error');

            const project = new Project(req.body);
            project.createdBy = req.user._id;
            //console.log(project);
            const projectStore = await project.save();

            return res.status(201).json({
                ok : true,
                msg :'Proyecto guardado',
                project: projectStore
            })
        } catch (error) {
           return errorResponse(res,error,'PROJECT-STORE');
        }
       
    },
    detail : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjectId.isValid(id)) throw createHttpError(400, "Invalid ID");

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404,'Project not found');
            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(401,'Authorization Error');

            return res.status(200).json({
                ok : true,
                msg :'Detalle del Proyecto',
                project
            })
        } catch (error) {
            return errorResponse(res,error,'PROJECT-DETAIL');
        }
       
    },
    update : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjectId.isValid(id)) throw createHttpError(400, "Invalid ID");

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404,'Project not found');
            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(401,'Authorization Error');

           
            const {name,description,client,dateExpire} = req.body;
            if([name,description,client].includes('')|| !name || !description || !client) throw createHttpError(400,'All fields are required');

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dateExpire = dateExpire || project.dateExpire;

            const projectUpdated = await project.save()

            return res.status(201).json({
                ok : true,
                msg :'Uptadet project',
                project: projectUpdated
            });

        } catch (error) {
            return errorResponse(res,error,'PROJECT-UPDATE');
        }
    },
    remove : async (req,res) => {
        try {
            const {id} = req.params;
            if(!ObjectId.isValid(id)) throw createHttpError(400, "Invalid ID");

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404,'Project not found');
            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(401,'Authorization Error');

            await project.deleteOne();

            return res.status(200).json({
                ok : true,
                msg :'Project removed'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECT-REMOVE'
            })
        }
    },
    addCollaborator : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Colaborador agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en COLLABORATOR-ADD'
            })
        }
    },
    removeCollaborator : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Colaborador eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en COLLABORATOR-REMOVE'
            })
        }
    },

}