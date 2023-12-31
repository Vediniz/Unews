import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: [String],
        required: true,
      },
    image:{
        type:String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    filters: [
        {
            type: String,
            enum: ["Alunos","Analise e Desenvolvimento de Sistemas", "Segurança da Informação", "Design de Moda", "Moda e Textil", "Logistica", "Gestão de Empresas", "Jogos Digitais", "TI", "Modas", "IMPORTANTES"],
        },
    ],
})


const News = mongoose.model('News', NewsSchema)

export default News