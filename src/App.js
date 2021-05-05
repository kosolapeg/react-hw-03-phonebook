import { useState, useEffect } from 'react';

import { ReactComponent as AddIcon } from './icons/add.svg';

import Section from './components/Section';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import shortid from 'shortid';

const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem('storedContacts');
    const parsedContacts = JSON.parse(storedContacts);
    console.log(parsedContacts);

    parsedContacts && setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('storedContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isExistName = contacts.some(contact => contact.name === name);

    if (isExistName) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newRecord = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prev => [newRecord, ...prev]);
    setShowModal(prev => !prev);
  };

  const getVisibleContacts = filter => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  const changeFilter = e => {
    const filterName = e.currentTarget.value;
    setFilter(filterName);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onToggleModal = e => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <Section title="Phonebook">
        <IconButton type="button" onClick={onToggleModal}>
          <AddIcon width="40" height="40" fill="#000"></AddIcon>
        </IconButton>
        {showModal && (
          <Modal onToggleModal={onToggleModal}>
            <Form onSubmit={addContact}></Form>
          </Modal>
        )}
      </Section>

      <Section title="Contacts">
        <Filter vlaue={filter} onChange={changeFilter} />

        <Contacts
          records={getVisibleContacts(filter)}
          onDelete={deleteContact}
        />
      </Section>
    </>
  );
};

export default App;
