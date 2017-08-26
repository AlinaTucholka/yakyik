import React, {Component} from 'react';
import Zone from '../presentation/Zone';
import CreateZone from '../presentation/CreateZone';
import {APIManager} from '../../utils';

class Zones extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log('component did mount');
        APIManager.get('/api/zone', null, (err, response) => {
            if (err) {
                alert(err.message);
                return
            }
            this.setState({list: response.results})
        });
    }
    addZone(zone) {
        let updatedZone = Object.assign({},
        zone);
        APIManager.post('/api/zone', updatedZone, (err, response) => {
            if (err) {
                alert(err);
                return
            }
            let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.result);
            this.setState({list: updatedList})
        });
    }

    render() {
        const listItems = this
            .state
            .list
            .map((zone, i) => {
                return (
                    <li key={i}>
                        <Zone currentZone={zone}/>
                    </li>
                )
            })
        return (
            <div>
                <ol>
                    {listItems}
                </ol>

                <CreateZone
                    onCreate={this
                    .addZone
                    .bind(this)}/>
            </div>
        )
    }
}

export default Zones;