import React, { useState } from "react";
import "./style.scss";
import { auth, firestore } from "../../Firebase/firebaseConfig"; // Ajuste o caminho conforme necessário
import { collection, doc, deleteDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Config: React.FC = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState(""); // Novo estado para a senha de exclusão
  const navigate = useNavigate(); // Inicializa o useNavigate

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const confirmDelete = window.confirm("Você tem certeza que deseja excluir sua conta?");
      if (!confirmDelete) return;

      try {
        // Verificação da senha atual
        const credential = EmailAuthProvider.credential(user.email || "", deletePassword); // Usando deletePassword
        await reauthenticateWithCredential(user, credential);

        // Excluindo os dados do Firestore
        const userRef = doc(collection(firestore, 'users'), user.uid);
        await deleteDoc(userRef);
        console.log("Dados do Firestore excluídos com sucesso.");

        // Excluindo a conta
        await user.delete();
        console.log("Conta do Firebase excluída com sucesso.");

        alert('Conta excluída com sucesso.');
        navigate("/"); // Redireciona para a rota raiz
      } catch (error) {
        const errorMessage = (error as Error).message || "Erro desconhecido.";
        console.error("Erro ao excluir conta:", errorMessage);
        alert(`Erro ao excluir conta: ${errorMessage}`);
      }
    } else {
      alert('Usuário não está logado.');
    }
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email || "", password);
        await reauthenticateWithCredential(user, credential);

        // Atualiza a senha usando updatePassword
        await updatePassword(user, newPassword);
        alert('Senha alterada com sucesso!');
        setNewPassword(""); // Limpa o campo de nova senha
      } catch (error) {
        const errorMessage = (error as Error).message || "Erro desconhecido.";
        console.error("Erro ao mudar a senha:", errorMessage);
        alert(`Erro ao mudar a senha: ${errorMessage}`);
      }
    } else {
      alert('Usuário não está logado.');
    }
  };

  return (
    <div className="config-container">
      <h1>Configuração de Perfil</h1>

      <h2>Alterar Senha</h2>
      <input
        type="password"
        placeholder="Digite sua senha atual"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua nova senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="change-password-button" onClick={handleChangePassword}>
        Mudar Senha
      </button>

      <h2>Excluir Conta</h2>
      <input
        type="password"
        placeholder="Digite sua senha para excluir"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
      />
      <button className="delete-account-button" onClick={handleDeleteAccount}>
        Excluir Conta
      </button>
    </div>
  );
};

export default Config;
