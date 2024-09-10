import {Button, Div, Group, Header, Panel, PanelHeader} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import catPersik from '../assets/persik.png';

export const Home = ({ id}) => {

    const getRandomPhotoUrl = () => {
        return fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => data.message)
            .catch(error => {
                console.error('Error getting the photo URL:', error);
                throw error;
            });
    };
    const openStoryEditor = () => {
        getRandomPhotoUrl()
            .then(photoUrl => {
                bridge.send('VKWebAppShowStoryBox', {
                    background_type: 'image',
                    url: photoUrl,
                    attachment: {
                        text: 'more',
                        type: 'url',
                        url: photoUrl,
                    }
                })
                    .then((data) => {
                        if (data.code_data) {
                            console.log(data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.error('Error while opening the story editor:', error);
            });
    };

    return (
        <Panel id={id}>
            <PanelHeader>Котики круто</PanelHeader>

            <Group header={<Header mode="secondary">Чтобы узнать, какой ты сегодня котик, жми....</Header>}>
                <Div>
                    <img src={catPersik} alt="" style={{ width: '100%', height: 'auto' }} />
                </Div>
                <Div>
                    <Button stretched size="l" mode="primary" onClick={openStoryEditor}>
                        СМОТРЕТЬ ДАЛЕЕ...............(не скам)
                    </Button>
                </Div>
            </Group>
        </Panel>
    );
};